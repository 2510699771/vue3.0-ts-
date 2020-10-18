<template>
  <div></div>
</template>

<script lang='ts'>
import api from "@/http/api";
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface dataItem {
  url: string;
  desc: string;
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
        .getData({
          subject: 1,
          key: "34fe8651ad47d1ead8e44072830c0be5",
          model: "c1",
          testType: "rand",
        })
        .then((res: Res) => {
          console.log(res);
          data.result = res.result;
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