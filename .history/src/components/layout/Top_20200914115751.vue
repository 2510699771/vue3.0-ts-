<template>
  <div>
    <img src="http://157.122.54.189:9093/images/logo.jpg" width="100" />
  </div>
  <div>
    <a-menu mode="horizontal" >
      <a-menu-item> <div class="navigation">首页</div> </a-menu-item>
      <a-menu-item> <div></div> 旅游攻略</a-menu-item>
      <a-menu-item> <div></div> 酒店</a-menu-item>
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