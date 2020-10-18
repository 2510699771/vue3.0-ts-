<template>
  <!-- 切换城市 -->
  <div class="strategyall">
    <div class="strategy">
      <div style="width:100%;border:1px solid orange">
        <a-input v-model:value="value" style="width:15%" placeholder="切换城市" />
        <a-range-picker
          v-model:value="value1"
          format="YYYY-MM-DD HH:mm:ss"
          :disabled-date="disabledDate"
          :disabled-time="disabledDateTime"
          :show-time="{hideDisabledOptions: true,
          defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
          }"
          @change="onChange"
          placeholder="切换城市"
        />
      </div>
    </div>
  </div>

  <div id="container"></div>
</template>

<script >
import moment from "moment";
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
        }
      });
    });
    let onChange = (date, dateString) => {
      console.log(date, dateString);
    };
    let range = (start, end) => {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    };
    let disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < moment().endOf("day");
    };

    let disabledDateTime = () => {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    };

    let disabledRangeTime = (_, type) => {
      if (type === "start") {
        return {
          disabledHours: () => data.range(0, 60).splice(4, 20),
          disabledMinutes: () => data.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      }
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
</style>