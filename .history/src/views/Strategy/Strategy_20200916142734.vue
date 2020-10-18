<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="left">
        <div></div>
        <div class="recommendedCity">推荐城市</div>
        <div></div>
      </div>
      <div class="right"></div>
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
  height: 800px;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 30%;
  border: 1px solid hotpink;
}
.right {
  width: 65%;
  border: 1px solid forestgreen;
}
.recommendedCity {
  width: 100%;
  display: flex;
  height: 60px;
  align-items: center;
  border: 1px solid gold;
  
  border-bottom: 1px solid rgb(190, 188, 188);
}
</style>