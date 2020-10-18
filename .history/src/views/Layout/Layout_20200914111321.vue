<template>
  <div>
    <a-menu v-model:selectedKeys="current" mode="horizontal">
      <a-menu-item key="mail">
        <mail-outlined />Navigation One
      </a-menu-item>
      <a-menu-item key="app" disabled>
        <appstore-outlined />Navigation Two
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
      <a-menu-item key="alipay">
        <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
      </a-menu-item>
    </a-menu>
  </div>
  <!-- <div>
    <!-- <router-view /> -->
  </div>-->
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
</style>