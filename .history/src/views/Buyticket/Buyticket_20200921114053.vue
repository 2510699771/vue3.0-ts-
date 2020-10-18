<template>
  <div></div>
</template>

<script lang='ts'>
import { useRoute, useRouter } from "vue-router";
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({});
    let router = useRouter();
    let route = useRoute();
    let
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>