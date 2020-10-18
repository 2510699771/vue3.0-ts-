<template>
  <div class="topall">
    <div class="topleft">
      <div>
        <img src="http://157.122.54.189:9093/images/logo.jpg" width="150" />
      </div>
      <div class="nav">
        <a-menu mode="horizontal" >
          <a-menu-item style="height: 80px;" v-for="(item,index) in top " :key="index">
            <div class="navigation">{{item.name}}</div>
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
import { useRoute, useRouter } from "vue-router";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
interface Data {
  top: item[];
}
interface item {
  name: string;
  path: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      top: [
        { name: "首页", path: "/" },
        { name: "旅游攻略", path: "/Strategy" },
        { name: "酒店", path: "/hotel" },
        { name: "国内机票", path: "/air" },
      ],
    });
    let route = useRoute();
    onMounted(() => {
      console.log(route.path);
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.topall {
  width: 70%;
  display: flex;
  height: 80px;
  justify-content: space-between;
}
.navigation {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
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
.login:hover {
  color: skyblue;
  text-decoration: underline;
}
.topbox {
  height: 82px;
}
</style>