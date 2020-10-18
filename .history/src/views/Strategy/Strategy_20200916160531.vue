<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="left">
        <div v-for="(item,index) in citys" :key="index" class="leftbox">
          <div class="leftcity">
            <div>{{item.type}}</div>
            <div>
              <RightOutlined />
            </div>
            <div class="cityinfo" v-if="index===1">
              <div style="width:90%">
                <div v-for="(ite,ind) in item.children" :key="ind" class="citychildren">
                  <div style="font-size:28px;color:orange">{{ind+1}}</div>
                  <div style="color: orange;">{{ite.city}}</div>
                  <div>{{ite.desc}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="recommendedCity">推荐城市</div>
      </div>
      <div class="conter"></div>
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
  width: 60%;
  height: 800px;
  display: flex;
  justify-content: space-between;
  position: relative;
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
  font-weight: bolder;
  font-size: 18px;
  border-bottom: 1px solid rgb(190, 188, 188);
  margin-top: 10px;
}
.leftcity {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin: 0 15px 0 15px;
  align-items: center;
  height: 45px;
}
.leftbox {
  width: 100%;
  border: 1px solid rgb(202, 202, 202);
}
.cityinfo {
  top: 0;
  width: 30%;
  position: absolute;
  left: 30%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
}
.citychildren {
  display: flex;
  height: 45px;
  align-items: center;
}
</style>