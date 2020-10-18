<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="leftall">
        <div style="width:100%;border:1px solid red" class="topleft">
          <div style="display:flex">
            <div>单程:</div>
            <div>{{departCity}}-{{destCity}}{{departDate}}</div>
          </div>
          <div style="display:flex">
            <a-select
              v-model:value="value1"
              style="width: 120px"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option>Jack</a-select-option>
            </a-select>
            <a-select
              v-model:value="value1"
              style="width: 120px"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option>Jack</a-select-option>
            </a-select>
            <a-select
              v-model:value="value1"
              style="width: 120px"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option>Jack</a-select-option>
            </a-select>
            <a-select
              v-model:value="value1"
              style="width: 120px"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option>Jack</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- 撤销按钮 -->
        <div>
          筛选:
          <a-button type="info" shape="round" :size="size">撤销</a-button>
        </div>
        <div class="infotitle">
          <div>航空信息</div>
          <div>起飞时间</div>
          <div>到达时间</div>
          <div>价格</div>
        </div>
        <div class="info">
          <div>东航 MU5316</div>
          <div>20:30</div>
          <div class="time">2小时20分</div>
          <div>22:50</div>
          <div>￥810起</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import api from "@/http/api";
import { useRoute, useRouter } from "vue-router";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import nProgress from "nprogress";
interface Data {
  departCity: string;
  departCode: string;
  destCity: string;
  destCode: string;
  departDate: string;
  total: number;
  current: number;
  defaultPageSize: number;
  pageSizeOptions: item[];
}
interface item {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      departCity: "",
      departCode: "",
      destCity: "",
      destCode: "",
      departDate: "",
// 
      total: 0,
      current: 1,
      defaultPageSize: 5,
      pageSizeOptions: ["3", "5", "10", "15"],
    });
    let router = useRouter();
    let route = useRoute();
    onMounted(() => {
      data.departCity = JSON.parse(route.query.item as string).departCity;
      data.departCode = JSON.parse(route.query.item as string).departCode;
      data.destCity = JSON.parse(route.query.item as string).destCity;
      data.destCode = JSON.parse(route.query.item as string).destCode;
      data.departDate = JSON.parse(route.query.item as string).departDate;
      api
        .JiPiao({
          departCity: data.departCity,
          departCode: data.departCode,
          destCity: data.destCity,
          destCode: data.destCode,
          departDate: data.departDate,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
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
  display: flex;
  justify-content: space-between;
  position: relative;
}
.topleft {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 0;
}
.leftall {
  width: 75%;
  display: flex;
  flex-direction: column;
}
.infotitle {
  display: flex;
  width: 100%;
  border: 1px solid rgb(197, 197, 197);
  height: 40px;
  background-color: rgb(241, 241, 241);
}
.infotitle > div {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
  display: flex;
  height: 80px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgb(197, 197, 197);
  position: relative;
}
.info > div {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.time {
  position: absolute;
  left: 45%;
  top: 35%;
}
</style>