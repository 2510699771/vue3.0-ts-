<template>
  <div class="topall">
    <div class="topleft">
      <div>
        <img src="http://157.122.54.189:9093/images/logo.jpg" width="150" />
      </div>
      <div class="nav">
        <div
          class="left"
          :class="{shine:$route.path===item.path}"
          v-for="(item,index) in top "
          :key="index"
          @click="goto(item)"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="login">
      <div class="navigation" v-if="user.nickname && user.defaultAvatar">
        <img :src="`${user.defaultAvatar}`" alt width="50" height="50" />
        <div>{{user.nickname}}</div>
      </div>
      <div class="navigation" @click="gologin" v-else>登录/注册</div>
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
  user: userItem;
}
interface userItem {
  nickname: string;
  defaultAvatar: string;
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
      user: {
        nickname: "",
        defaultAvatar: "",
      },
    });
    let router = useRouter();
    const goto = (item: item): void => {
      router.push(item.path);
    };
    const gologin = (): void => {
      router.push("/login");
    };
    let route = useRoute();
    onMounted(() => {
      console.log(route.path);
      let user = JSON.parse(localStorage.getItem("user") as string);
      if (user) {
        data.user.nickname = user.nickname;
        data.user.defaultAvatar =
          `http://157.122.54.189:9095` + user.defaultAvatar;
      }
    });
    return {
      ...toRefs(data),
      goto,
      gologin,
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
  width: 70%;
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
.left {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  width: 15%;
  height: 100%;
}
.left:hover {
  cursor: pointer;
  color: skyblue;
  border-bottom: 3px solid skyblue;
}
.nav {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  height: 100%;
}

.shine {
  color: skyblue;
  border-bottom: 3px solid skyblue;
  cursor: pointer;
}
</style>