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
        <div class="Trapezoid">攻略</div>
        <div class="Trapezoid">酒店</div>
        <div class="Trapezoid">机票</div>
        <div>
          <a-input-search
            v-model:value="value"
            placeholder="input search text"
            style="width:20%"
            @search="onSearch"
          />
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
  figure: dataItem[];
  value: string;
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
      figure: [
        {
          url: "",
          desc: "",
        },
      ],
      value: "",
    });
    let route = useRoute();
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
    };
  },
});
</script>

<style scoped lang='scss'>
.Trapezoid {
  height: 50;
  width: 80px;
  border-bottom: 50px solid rgb(180, 179, 179);
  border-right: 20px solid transparent;
  display: flex;
  justify-content: center;
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