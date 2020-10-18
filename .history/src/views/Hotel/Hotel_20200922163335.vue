<template>
  <!-- 切换城市 -->
  <div class="strategyall">
    <div class="strategy">
      <div style="width:100%;display:flex">
        <a-input v-model:value="value" style="width:20%;" placeholder="切换城市" />
        <a-range-picker v-model:value="value1" style="margin-left:15px;" @change="onChange" />
        <a-button
          style="margin-left:12px;width:15%;color: rgb(208, 208, 208);display:flex;justify-content:space-between;align-items: center;font-size:14px;padding:0 10px"
        >
          <template v-slot:icon>
            人数未定
            <SearchOutlined />
          </template>
        </a-button>
        <a-button style="margin-left:12px;" type="primary">查看价格</a-button>
      </div>
      <div style="margin-top:15px">
        <div>
          <div>区域</div>
          <div></div>
        </div>
        <div>
          <div id="container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import api from "@/http/api";
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
    let data = reactive({
      value: "", //切换城市
      value1: [],
    });
    onMounted(() => {
      //穿件地图实例
      let map = new AMap.Map("container");
      //定位当前城市
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
          //console.log("定位成功信息：", data.addressComponent.city);
          //获得当前城市区域信息
          api
            .getcities({ name: data.addressComponent.city })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        function onError(data) {
          // 定位出错
          console.log("定位失败错误：", data);
          // 调用IP定位
          self.getLngLatLocation();
        }
      });
    });
    let onChange = (date, dateString) => {
      console.log(date, dateString);
    };
    return {
      ...toRefs(data),
      onChange,
    };
  },
});
</script>

<style scoped lang='scss'>
#container {
  width: 300px;
  height: 180px;
}
.strategyall {
  margin-top: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 0;
}
.strategy {
  width: 60%;
}
.ant-calendar-range-picker-input {
  height: 40px;
}
.area {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>