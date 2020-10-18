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
      <!-- 右侧 -->
      <div style="width:30%;border:1px solid red">
        <div class="about">相关攻略</div>
        <div class="aboutinfo" v-for="(item,index) in about " :key="index" style="cursor:pointer" @click="">
          <div style="font-size: 16.5px;font-weight: bold;margin-top:10px;">{{item.title}}</div>
          <div style="display:flex">
            <div>{{item.updated_at}}</div>
            <div v-if="item.watch">阅读{{item.watch}}</div>
            <div v-else>阅读0</div>
          </div>
        </div>
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
  info: [];
  about: [];
}
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
      info: [],
      about: [],
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
      // 相关文章
      api
        .about({ id: data.id })
        .then((res) => {
          console.log(res);
          data.about = res.data;
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
.about {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(201, 201, 201);
  font-size: 16.5px;
  font-weight: bolder;
}
.aboutinfo {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid rgb(201, 201, 201);
  font-size: 13px;
}
</style>