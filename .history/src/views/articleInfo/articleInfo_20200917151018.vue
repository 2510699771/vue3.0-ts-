<template>
  <div></div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({});
    let route = useRoute();
    onMounted(() => {
      console.log(route.query.id, "89787878");
      
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>