<template>
  <div class="strategyall">
    <div class="strategy">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Title"
        :breadcrumb="{ routes }"
        sub-title="This is a subtitle"
      />
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
  routes:routesItem[]
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
          path: "index",
          breadcrumbName: "First-level Menu",
        },
        {
          path: "second",
          breadcrumbName: "Third-level Menu",
        },
      ],
    });
    let route = useRoute();
    onMounted(() => {
      console.log(route.query.id, "89787878");
      data.id = Number(route.query.id as string);
      // 推荐城市
      api
        .articleinfo({ id: data.id })
        .then((res) => {
          console.log(res);
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