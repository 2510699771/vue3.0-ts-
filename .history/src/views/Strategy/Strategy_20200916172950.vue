<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="left">
        <div
          v-for="(item,index) in citys"
          :key="index"
          class="leftbox"
          @mouseenter="getfcus(item)"
          @mouseleave="cleanfcus"
        >
          <div class="leftcity">
            <div>{{item.type}}</div>
            <div>
              <RightOutlined />
            </div>
            <div class="cityinfo" v-if="children.children">
              <div style="width:95%">
                <div v-for="(ite,ind) in children.children" :key="ind" class="citychildren">
                  <div style="font-size:28px;color:orange">{{ind+1}}</div>
                  <div style="color: orange;margin-left:15px;word-wrap:nowrap">{{ite.city}}</div>
                  <div style="margin-left:15px;word-wrap:nowrap">{{ite.desc}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="recommendedCity">推荐城市</div>
        <div style="width:100%;height:200px;margin-top:15px">
          <img src="../../img/pic.png" style="width:100%" />
        </div>
        <div class="conter"></div>
        <div class="right"></div>
      </div>
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
  children: object;
}

export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      citys: [],
      children: {},
    });
    let getfcus = (item: object): void => {
      data.children = item;
      console.log(data.children);
    };
    let cleanfcus = (): void => {
      //   data.children = {};
      console.log(data.children);
    };
    onMounted(() => {
      api
        .cities()
        .then((res) => {
          //console.log(res);
          data.citys = res.data;
          // console.log(data.citys);
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      getfcus,
      cleanfcus,
    };
  },
});
</script>

<style scoped lang='scss'>
.strategyall {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
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
  min-width: 30%;
  position: absolute;
  left: 30%;
  display: flex;
  justify-content: center;
  background-color: white;
  border: 1px solid rgba(185, 182, 182, 0.63);
}
.citychildren {
  display: flex;
  height: 45px;
  align-items: center;
  flex-wrap: nowrap;
}
.city {
  word-wrap: none;
}
.leftbox:hover {
  border-right: 0px solid #eee !important;
}
</style>