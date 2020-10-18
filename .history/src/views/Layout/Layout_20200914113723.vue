<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header class="header">
        <Top></Top>
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer><Bottom></Bottom></a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang='ts'>
import Top from "../../components/layout/Top.vue";
import Bottom from "../../components/layout/Bottom.vue";
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {
    Top,
    Bottom
  },
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
#components-layout-demo-basic .ant-layout-header {
  background-color: white;
  height: 50px;
  border-bottom: 1px solid rgb(214, 210, 210);
  display: flex;
  justify-content: center;
  align-items: center;
}
#components-layout-demo-basic .ant-layout-content {
  height: 400px;
}
</style>