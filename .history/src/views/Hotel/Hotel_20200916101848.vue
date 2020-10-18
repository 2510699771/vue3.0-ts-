<template>
  <div style="height: 300px;">
    <div class="Trapezoid">231313</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.Trapezoid {
  height: 0;
  width: 100px;
  border-bottom: 50px solid #2c74e6;
  border-right: 50px solid transparent;
}
</style>