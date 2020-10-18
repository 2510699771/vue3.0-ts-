<template>
  <div class="loginbcg">
    <div class="login">
      <div class="log">
        <div
          v-for="(item,index) in top"
          :key="index"
          :class="{shine:num===index}"
          @click="lognbtn(index)"
        >{{item.name}}</div>
      </div>
      <a-form
        ref="Form"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        v-if="num === 0"
        @finish="handleFinish"
      >
        <a-form-item name="username">
          <a-input v-model:value="form.username" placeholder="用户名" />
        </a-form-item>
        <a-form-item name="password" required>
          <a-input v-model:value="form.password" placeholder="密码" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 20, offset: 2 }">
          <a-button type="primary" style="width:100%" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>

      <a-form
        ref="registered"
        :model="form1"
        :rules="rules1"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        v-if="num === 1"
        @finish="registeredall"
      >
        <a-form-item name="userphone">
          <a-input v-model:value="form1.userphone" placeholder="用户名手机" />
        </a-form-item>
        <a-form-item name="code" class="display:flex">
          <a-input v-model:value="form1.code" placeholder="手机验证码" style="width:63%" />
          <a-button @click="code">发送验证码</a-button>
        </a-form-item>
        <a-form-item name="username">
          <a-input v-model:value="form1.username" placeholder="昵称" />
        </a-form-item>
        <a-form-item name="password">
          <a-input v-model:value="form1.password" placeholder="密码" />
        </a-form-item>
        <a-form-item name="confirmPassword">
          <a-input v-model:value="form1.confirmPassword" placeholder="确认密码" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 20, offset: 2 }">
          <a-button type="primary" html-type="submit" style="width:100%">注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang='ts'>
import {
  defineComponent,
  toRefs,
  SetupContext,
  reactive,
  toRaw,
  ref,
} from "vue";
import api from "@/http/api";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { Form } from "ant-design-vue/types/form/form";
import { message } from "ant-design-vue";
// import { useForm } from "@ant-design-vue/use";
interface Data {
  form: fromItem;
  form1: fromItem1;
  rules: rulesItem;
  rules1: rulesItem1;
  layout: layItem;
  num: number;
  top: topitem[];
  user: any;
}
interface topitem {
  name: string;
}
interface layItem {
  labelCol: labelColspan;
  wrapperCol: labelColspan;
}
interface labelColspan {
  span: number;
}
interface fromItem {
  username: string;
  password: string;
}
interface fromItem1 {
  userphone: string | number;
  code: string;
  username: string;
  password: string;
  confirmPassword: string;
}
interface rulesItem {
  username: runameItem[];
  password: pawordItem[];
}
interface rulesItem1 {
  userphone: runameItem[];
  code: runameItem[];
  username: runameItem[];
  password: runameItem[];
  confirmPassword: runameItem[];
}
interface runameItem {
  message?: string;
  trigger?: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (
    rule: any,
    value: any,
    callback: () => void
  ) => Promise<void> | void;
}
interface pawordItem {
  required: boolean;
  message: string;
  trigger: string;
}
interface Res {
  token?: string;
  user?: useritem;
  message?: string;
}
interface useritem {
  created_at: number;
  defaultAvatar: string;
  email: string | null;
  id: number;
  role: number;
  nickname: string;
  starPosts: number | null;
  updated_at: number;
  username: string;
}
interface object1 {
  id: string;
  name: string;
  description: string;
  type: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let ruleFrom = ref<Form | null>(null);
    //data中定义
    let data: Data = reactive<Data>({
      user: {},
      num: 0,
      top: [{ name: "登录" }, { name: "注册" }],
      form: {
        username: "",
        password: "",
      },
      form1: {
        userphone: "",
        code: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      //规则
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 12, message: "账号长度为3-12位之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
      rules1: {
        userphone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: RegExp(/^1[34578]\d{9}$/),
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        confirmPassword: [
          {
            validator: (rule: any, value: any, callback: () => void) => {
              if (value === "") {
                return Promise.reject("请再次输入密码");
              } else if (value !== data.form1.password) {
                return Promise.reject("两次密码不一致");
              } else {
                return Promise.reject();
              }
            },
            trigger: "blur",
          },
        ],
      },
      layout: {
        labelCol: { span: 14 },
        wrapperCol: { span: 14 },
      },
    });
    let registered = ref<Form | null>(null);
    let Form = ref<Form | null>(null);
    let store = useStore();
    let router = useRouter();
    //登录
    let handleFinish = () => {
      api
        .login({
          username: data.form.username, //手机号码
          password: data.form.password,
        })
        .then((res: Res) => {
          if (res.token) {
            data.user = res.user;
            message.success("登录成功");
            localStorage.setItem("token", res.token!);
            localStorage.setItem("user", JSON.stringify(res.user));
            console.log(res.user);
            store.commit("setserinfo", data.user);
            router.push({
              path: "/",
              query: {
                use: JSON.stringify(res.user!),
              },
            });
            registered.value!.resetFields();
          } else {
            message.error(res.message);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    //注册
    let registeredall = () => {
      api
        .registered({
          username: data.form1.userphone,
          nickname: data.form1.username,
          captcha: data.form1.code,
          password: data.form1.password,
        })
        .then((res: Res) => {
          if (res.token) {
            message.success("注册成功");
            localStorage.setItem("token", res.token!);
            localStorage.setItem("user", JSON.stringify(res.user));
            store.commit("setuserinfo", res.user);
            router.push("/");
            registered.value!.resetFields();
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    //切换登录注册
    let lognbtn = (index: number): void => {
      data.num = index;
    };
    //获取手机验证码
    let code = (): void => {
      if (data.form1.userphone) {
        api
          .Accont({
            tel: data.form1.userphone,
          })
          .then((res) => {
            message.success("模拟手机验证码" + res.code);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    };
    return {
      labelCol: { span: 20, offset: 2 },
      wrapperCol: { span: 20, offset: 2 },
      ...toRefs(data),
      handleFinish,
      lognbtn,
      code,
      registeredall,
    };
  },
});
</script>

<style scoped lang='scss'>
.loginbcg {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  background-color: white;
  width: 18%;
}
.log {
  display: flex;
  justify-content: space-between;
}
.log > div {
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shine {
  color: orange;
  border-top: 2px solid orange;
  background: #fff;
  font-weight: 700;
}
</style>