<template>
  <div>
    <div class="strategyall">
      <div class="strategy">
        <div style="color:orange;font-size:18px" class="topimg">
          <img src="../../img/air.png" width="30" alt />国内机票
        </div>
        <div class="middle"></div>
      </div>
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
  margin-top: 2px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 0;
}
.strategy {
  width: 60%;
  display: flex;
  justify-content: center;
  position: relative;
}
.topimg {
  height: 50px;
  display: flex;
  align-items: center;
}
.middle {
  width: 100%;
  height: 500px;
  border: 1px solid red;
}
</style>