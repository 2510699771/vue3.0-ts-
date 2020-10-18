<template>
  <a-carousel arrows>
    <template v-slot:prevArrow>
      <div class="custom-slick-arrow" style="left: 10px;zIndex: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template v-slot:nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>
    <div v-for="(item,index) in figure" :key="index" class="forimg">
      <div
        :style="`background: url(${item.url}) center center no-repeat`"
        style="height:700px;back-position:conter;display:flex;justify-content:center;align-items: center;flex-direction: column;"
      >
        <div style="display:flex">
          <div
            v-for="(item,index) in input"
            :key="index"
            style="display:flex"
            @click="lognbtn(index)"
          >
            <div class="Trapezoid" :class="{shine:num===index}">{{item.name}}</div>
            <div class="bottonLeft" :class="{shine1:num===index}"></div>
          </div>
        </div>

        <div style="width: 20%;">
          <a-input-search v-model:value="value" placeholder="input search text" @search="onSearch" />
        </div>
      </div>
    </div>
  </a-carousel>
</template>

<script lang='ts'>
import { useRoute, useRouter } from "vue-router";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
import api from "@/http/api";
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  SetupContext,
} from "vue";
interface dataItem {
  url: string;
  desc: string;
}
interface Res {
  data?: dataItem[];
  total?: number;
}
interface Data {
  num: number;
  figure: dataItem[];
  value: string;
  input: inputitem[];
}
interface inputitem {
  name: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
  },
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      num: 0,
      figure: [
        {
          url: "",
          desc: "",
        },
      ],
      value: "",
      input: [{ name: "攻略" }, { name: "酒店" }, { name: "机票" }],
    });
    let route = useRoute();
    //切换攻略 酒店 机票
    let lognbtn = (index: number): void => {
      data.num = index;
    };
    onMounted(() => {
      console.log(route.query.use, "77777777");
      api
        .getIndex()
        .then((res: Res) => {
          res.data!.map((item) => {
            item.url = `http://157.122.54.189:9095${item.url}`;
          });
          data.figure = res.data!;
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      lognbtn,
    };
  },
});
</script>

<style scoped lang='scss'>
.bottonLeft {
  width: 0;
  height: 0;
  border-bottom: 50px solid rgba(0, 0, 0, 0.514);
  border-right: 20px solid transparent;
}
.shine1 {
  border-bottom: 50px solid rgb(228, 228, 228);
}
.Trapezoid {
  width: 80px;
  height: 50px;
  display: flex;
  color: white;
  background-color: rgba(0, 0, 0, 0.514);
  justify-content: center;
  align-items: center;
}
.shine {
  display: flex;
  color: black;
  background-color: rgb(228, 228, 228);
}
.ant-carousel ::v-deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  opacity: 0.3;
}
.ant-carousel ::v-deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel ::v-deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel ::v-deep(.slick-slide h3) {
  color: #fff;
}
.forimg {
  height: 600px;
}
</style>