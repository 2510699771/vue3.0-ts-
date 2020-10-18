<template>
  <div>
    <img src="http://157.122.54.189:9093/images/logo.jpg" width="100" />
  </div>
  <div class="navigation">
    <a-menu mode="horizontal">
      <a-menu-item>首页</a-menu-item>
      <a-menu-item>旅游攻略</a-menu-item>
      <a-menu-item>酒店</a-menu-item>
      <a-menu-item>国内机票</a-menu-item>
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
.navigation {
  font-size: 5px;
}
</style>