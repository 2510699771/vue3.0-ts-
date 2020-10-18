<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="left">
        <div
          v-for="(item,index) in citys"
          :key="index"
          class="leftbox"
          @mouseenter="getfcus(item,index)"
          @mouseleave="cleanfcus"
        >
          <div class="leftcity">
            <div style="cursor:pointer" class="type">{{item.type}}</div>
            <div style="cursor:pointer">
              <RightOutlined />
            </div>
            <div class="cityinfo" v-if="num===index">
              <div style="width:95%">
                <div v-for="(ite,ind) in item.children" :key="ind" class="citychildren">
                  <div style="font-size:25px;color:orange;">{{ind+1}}</div>
                  <div
                    class="type"
                    style="color: orange;margin-left:15px;word-wrap:nowrap;cursor:pointer"
                  >{{ite.city}}</div>
                  <div
                    class="type"
                    style="margin-left:15px;word-wrap:nowrap;color: gray;cursor:pointer"
                  >{{ite.desc}}</div>
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
      </div>
      <div class="right">
        <div style="width:100%;border:3px solid orange">
          <input
            v-model="value"
            placeholder="想去的地方，比如:'广州'"
            @search="onSearch"
            style="outline:none;outline-width:0;width:93%;border:1px solid red"
            class="ant-input-search"
          />
          <SearchOutlined  style="fo" />
        </div>
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
  num: number;
  value: string;
}

export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      citys: [],
      value: "",
      num: -1,
    });
    let getfcus = (item: object, index: number): void => {
      data.num = index;
      //  console.log(data.children,111,data.num);
    };
    let cleanfcus = (): void => {
      data.num = -1;
      //   console.log(data.children,222);
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
  font-size: 14px;
  font-weight: bolder;
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
  z-index: 5;
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
  color: orange;
  border-right: 0px solid #eee !important;
}
.type:hover {
  text-decoration: underline;
}
.ant-input-search {
  outline: none;
  border: none;
  height: 38px;
  font-size: 15px;
  text-indent: 1em;
}
</style>