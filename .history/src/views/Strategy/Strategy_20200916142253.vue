<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="left"></div>
      <div></div>
    </div>
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
.strategyall {
  width: 100%;
  display: flex;
  justify-content: center;
}
.strategy {
  width: 65%;
  border: 1px solid red;
  height: 200px;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 30%;
}
</style>