<template>
  <!-- <div>
    <a-menu v-model:selectedKeys="current" mode="horizontal">
      <a-menu-item key="mail">
        <mail-outlined />Navigation One
      </a-menu-item>
      <a-sub-menu>
        <template v-slot:title>
          <span class="submenu-title-wrapper">
            <setting-outlined />Navigation Three - Submenu
          </span>
        </template>
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1">Option 1</a-menu-item>
          <a-menu-item key="setting:2">Option 2</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3">Option 3</a-menu-item>
          <a-menu-item key="setting:4">Option 4</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
  </div>-->
  <a-button type></a-button>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>
        <router-view />
        <StepBackwardOutlined />
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
</style>