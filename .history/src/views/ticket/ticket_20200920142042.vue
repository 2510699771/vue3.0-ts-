<template>
  <div>
    <div>单程</div>
    <div></div>
  </div>
</template>

<script lang='ts'>
import { useRoute, useRouter } from "vue-router";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      from:"广州",
      to:"上海"
    });
    let router = useRouter();
    let route = useRoute();
    onMounted(() => {
      console.log(route.query);
      data.from=route.query
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>