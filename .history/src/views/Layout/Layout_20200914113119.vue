<template>
  
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header class="header">Header</a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang='ts'>
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
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
}
#components-layout-demo-basic .ant-layout-content {
  height: 400px;
}
</style>