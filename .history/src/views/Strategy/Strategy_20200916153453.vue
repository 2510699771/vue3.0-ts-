<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="left">
        <div ="">
          <div v-for="(item,index) in citys" :key="index" class="leftbox">
            <div class="leftcity">
              <div>{{item.type}}</div>
              <div>
                <RightOutlined />
              </div>
            </div>
          </div>
        </div>
        <div class="recommendedCity">推荐城市</div>
        <div></div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import api from "@/http/api";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
interface Data {
  citys: [];
}

export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      citys: [],
    });
    onMounted(() => {
      api
        .cities()
        .then((res) => {
          //console.log(res);
          data.citys = res.data;
          console.log(data.citys);
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
  width: 100%;
  display: flex;
  justify-content: center;
}
.strategy {
  width: 65%;
  height: 800px;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 30%;
  border: 1px solid hotpink;
}
.right {
  width: 65%;
  border: 1px solid forestgreen;
}
.recommendedCity {
  width: 100%;
  display: flex;
  height: 60px;
  align-items: center;
  border: 1px solid gold;
  font-weight: bolder;
  font-size: 18px;
  border-bottom: 1px solid rgb(190, 188, 188);
}
.leftcity {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin: 0 15px 0 15px;
  align-items: center;
  height: 35px;
  border: 1px solid rgb(192, 188, 188);
}
.leftbox {
}
</style>