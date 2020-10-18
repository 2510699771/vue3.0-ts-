<template>
  <div></div>
</template>

<script lang='ts'>
import api from "@/http/api";
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface 
interface Data {
figure:dataItem{}
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      figure:{}
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>