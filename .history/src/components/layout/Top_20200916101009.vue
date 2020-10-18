<template>
  <div class="Trapezoid">231313</div>
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
      <div class="user" v-if="user.nickname && user.defaultAvatar">
        <a-dropdown>
          <a class="user" @click="e => e.preventDefault()">
            <div class="img">
              <img
                :src="`${user.defaultAvatar}`"
                alt
                width="35"
                height="35"
                style=" border-radius: 50%;"
              />
            </div>
            <div style="margin-left:2px">{{user.nickname}}</div>
            <div style="margin-left:5px">
              <CaretDownOutlined />
            </div>
          </a>
          <template v-slot:overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">个人中心</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="exit">退出</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
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
    const exit = (): void => {
      data.user.nickname = "";
      data.user.defaultAvatar = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    };
    let route = useRoute();
    onMounted(() => {
      // console.log(route.path);
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
      exit,
    };
  },
});
</script>

<style scoped lang='scss'>
.Trapezoid {
  height: 0;
  width: 180px;
  border-bottom: 180px solid #2c74e6;
  border-right: 100px solid transparent;
  border: 1px solid red;
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
  cursor: pointer;
}
.navigation:hover {
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
.user {
  font-size: 13px;
  color: black;
  display: flex;
  align-items: center;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43px;
  height: 43px;
  border-radius: 50%;
}
.login :hover .img {
  border: 2px solid rgb(45, 165, 212);
}
.ant-dropdown-trigger {
  color: black;
}
</style>