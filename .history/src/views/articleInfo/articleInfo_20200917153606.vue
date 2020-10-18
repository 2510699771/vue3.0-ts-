<template>
  <div class="strategyall">
    <div class="strategy">
     <div></div> <a-page-header  :breadcrumb="{ routes }" />
      <div>{{info.title}}</div>
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
}
.strategy {
  width: 60%;
  display: flex;
  justify-content: space-between;
  position: relative;
  border: 1px solid red;
}
</style>