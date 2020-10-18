<template>
  <div></div>
</template>

<script lang='ts'>
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
  data: dataItem[];
  total?: number;
}
interface Data {
  figure: dataItem[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      figure: [
        {
          url: "",
          desc: "",
        },
      ],
    });
    onMounted(() => {
      api
        .getIndex()
        .then((res:Res) => {
          console.log(res);
          data.figure = res.data;
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
</style>