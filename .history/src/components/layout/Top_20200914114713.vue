<template>
  <div>
    <a-menu v-model:selectedKeys="current" mode="horizontal">
      <a-menu-item>
        <mail-outlined />
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        首页
      </a-menu-item>
      <a-menu-item>
        <mail-outlined />Navigation One
      </a-menu-item>
    </a-menu>
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