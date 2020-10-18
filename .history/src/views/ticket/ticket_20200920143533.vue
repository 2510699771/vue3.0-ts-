<template>
  <div>
    <div>
      <div>单程:</div>
      <div>{{data.departDate}}</div>
    </div>
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
interface Data {
  data: [];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      data: [],
    });
    let router = useRouter();
    let route = useRoute();
    onMounted(() => {
      data.data = JSON.parse(route.query.item as string);
      console.log(data.data);
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>