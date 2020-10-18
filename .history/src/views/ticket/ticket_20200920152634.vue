<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="leftall">
        <div style="width:100%;border:1px solid red" class="topleft">
          <div style="display:flex">
            <div>单程:</div>
            <div>{{data.departCity}}-{{data.destCity}}{{data.departDate}}</div>
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
          <!-- <div>2小时20分</div> -->
          <div>22:50</div>
          <div>￥810起</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { useRoute, useRouter } from "vue-router";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
interface Data {
  data: [];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      data: [],
    });
    let router = useRouter();
    let route = useRoute();
    onMounted(() => {
      data.data = JSON.parse(route.query.item as string);
      console.log(data.data);
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
}
.info > div {
  flex: 1;
  di
}
</style>