<template>
  <div class="strategyall">
    <div class="strategy">
      <div style="width:70%">
        <div>
          <a-page-header style="margin:0" :breadcrumb="{ routes }" />
        </div>
        <h1
          style="border-bottom:1px solid rgb(196, 194, 194);height:80px;width:100%;display:flex;align-items: center;font-size:30px;font-weight: bolder;"
        >{{info.title}}</h1>
        <div class="html" v-html="info.content"></div>
      </div>
      <div style="width:30%;border:1px solid red">
          <div class="about">相关攻略</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import api from "@/http/api";
import { useRoute, useRouter } from "vue-router";
interface Data {
  id: number;
  routes: routesItem[];
  info: infoItem;
}
interface infoItem {}
interface routesItem {
  path: string;
  breadcrumbName: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      id: 0,
      routes: [
        {
          path: "/Strategy",
          breadcrumbName: "旅游攻略",
        },
        {
          path: "/articleInfo",
          breadcrumbName: "攻略详情",
        },
      ],
      info: {},
    });
    let route = useRoute();
    onMounted(() => {
      console.log(route.query.id, "89787878");
      data.id = Number(route.query.id as string);
      // 推荐城市
      api
        .articleinfo({ id: data.id })
        .then((res) => {
          console.log(res.data[0]);
          data.info = res.data[0];
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
  margin-top: 20px;
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
.html /deep/ img {
  width: 100%;
}
.html /deep/ p:nth-of-type(5) > img {
  width: 50px;
}
.html /deep/ p {
  font-size: 18px;
}
.about{
    width: 100%;
    
}
</style>