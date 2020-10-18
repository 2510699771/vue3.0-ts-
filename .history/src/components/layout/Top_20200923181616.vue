<template>
  <div class="topall">
    <div class="topleft">
      <div style="cursor:pointer" @click="home">
        <img src="http://157.122.54.189:9093/images/logo.jpg" width="150" />
      </div>
      <div class="nav">
        <div
          class="left"
          :class="{shine:$route.meta.parentpath===item.path}"
          v-for="(item,index) in top "
          :key="index"
          @click="goto(item)"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="login">
      <div class="user" v-if="userinfow ">
        <a-dropdown>
          <a class="user" @click="e => e.preventDefault()">
            <div class="img">
              <img
                :src="`http://157.122.54.189:9095${userinfow.defaultAvatar}`"
                alt
                width="35"
                height="35"
                style=" border-radius: 50%;"
              />
            </div>
            <div style="margin-left:2px">{{userinfow.nickname}}</div>
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
import { useStore } from "vuex";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
  computed,
} from "vue";
interface Data {
  top: item[];
  userinfow: object;
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
      userinfow: {},
    });
    let router = useRouter();
    let store = useStore();
    let userinfow = computed(() => {
      return store.state.userinfo;
    });
    let home= ()=>{
      router.push('/home);
    }
    const goto = (item: item): void => {
      router.push(item.path);
    };
    const gologin = (): void => {
      router.push("/login");
    };
    const exit = (): void => {
      store.commit("setuserinfo", null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    };
    let route = useRoute();
    return {
      ...toRefs(data),
      goto,
      gologin,
      exit,
      userinfow,
    };
  },
});
</script>

<style scoped lang='scss'>
.topall {
  width: 60%;
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