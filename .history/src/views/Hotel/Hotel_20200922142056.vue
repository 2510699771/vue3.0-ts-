<template>
  <div style="height: 300px;">
    <div id="container"></div>
  </div>
</template>

<script >
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx) {
    let data = reactive({});
    onMounted(() => {
      let map = new AMap.Map("container");
      AMap.plugin("AMap.Geolocation", function () {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log("定位成功信息：", data.addressComponent.city);
          self.city = data.addressComponent.city;
        }

        function onError(data) {
          // 定位出错
          console.log("定位失败错误：", data);
          // 调用IP定位
          self.getLngLatLocation();
        }
      });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
#container {
  width: 300px;
  height: 180px;
}
</style>