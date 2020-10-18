<template>
  <div>
    <div>
      <div>
        <img src="http://157.122.54.189:9093/images/logo.jpg" width="100" />
      </div>
      <div>
        <a-menu mode="horizontal">
          <a-menu-item>
            <div class="navigation">首页</div>
          </a-menu-item>
          <a-menu-item>
            <div class="navigation">旅游攻略</div>
          </a-menu-item>
          <a-menu-item>
            <div class="navigation">酒店</div>
          </a-menu-item>
          <a-menu-item>
            <div class="navigation">国内机票</div>
          </a-menu-item>
        </a-menu>
      </div>
    </div>
    <div>
      <div></div>
    </div>
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
  font-size: 10px;
}
</style>