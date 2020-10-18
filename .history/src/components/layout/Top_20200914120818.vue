<template>
  <div class="topall">
    <div class="topleft">
      <div>
        <img src="http://157.122.54.189:9093/images/logo.jpg" width="80" />
      </div>
      <div class="nav">
        <a-menu mode="horizontal" class="nav">
          <a-menu-item class="nav">
            <div cla="title">首页</div>
          </a-menu-item>
          <a-menu-item class="nav">
            <div class="navigation">旅游攻略</div>
          </a-menu-item>
          <a-menu-item class="nav">
            <div class="navigation">酒店</div>
          </a-menu-item>
          <a-menu-item class="nav">
            <div class="navigation">国内机票</div>
          </a-menu-item>
        </a-menu>
      </div>
    </div>
    <div class="login">
      <div class="navigation">登录/注册</div>
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
.topall {
  width: 80%;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.navigation {
  font-size: 10px;
}
.topleft {
  display: flex;
  align-items: center;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav {
  height: 20px;
}
</style>