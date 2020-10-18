<template>
  <div>
    <div class="strategyall">
      <div class="strategy">
        <div style="color:orange;font-size:18px" class="topimg">
          <img src="../../img/air.png" width="30" alt />国内机票
        </div>
        <div class="middle">
          <div style="width:33%;border:1px solid rgb(199, 199, 199);border-top:1px solid white">
            <div style="width:100%;display:flex; ">
              <div
                style="flex:1;display:flex;justify-content: center;align-items: center;height:55px;border-top:3px solid orange"
              >
                <div class="icon">
                  <SwapRightOutlined />
                </div>
                <div style="margin-left:5px">单程</div>
              </div>
              <div
                style="flex:1;display:flex;justify-content: center;align-items: center;height:55px;background-color: rgb(230, 211, 211)"
              >
                <div class="icon">
                  <SwapOutlined />
                </div>
                <div style="margin-left:5px">往返</div>
              </div>
            </div>
          </div>
          <div style="width:65%"></div>
        </div>
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
  flex-direction: column;
}
.topimg {
  height: 50px;
  display: flex;
  align-items: center;
}
.middle {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-between;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: black;
  border: 1px solid rgb(0, 0, 0);
}
</style>