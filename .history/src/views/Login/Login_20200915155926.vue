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
import { Form } from "ant-design-vue/types/form/form";
// import { useForm } from "@ant-design-vue/use";
interface Data {
  form: fromItem;
  form1: fromItem1;
  rules: rulesItem;
  rules1: rulesItem1;
  layout: layItem;
  num: number;
  top: topitem[];
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
  jwt: string;
  user: useritem[];
}
interface useritem {
  id: string;
  username: string;
  email: string;
  role: object;
  nickname: string;
  created_at: number;
  updated_at: number;
  comments: [];
}
interface object {
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
    //重复密码验证
    let checkpassword = (rule: any, value: any, callback: () => void) => {
      if (value === "") {
        return Promise.reject("请再次输入密码");
      } else if (value !== data.form1.password) {
        return Promise.reject("两次密码不一致");
      } else {
        return Promise.reject();
      }
    };
    //data中定义
    let data: Data = reactive<Data>({
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
        confirmPassword: [{ validator: checkpassword, trigger: "blur" }],
      },
      layout: {
        labelCol: { span: 14 },
        wrapperCol: { span: 14 },
      },
    });
    //登录
    let handleFinish = (values: any) => {
      console.log(values);
    };
    //注册
    let registeredall = (values: any) => {
      console.log(values);
      api
        .getIndex()
        .then((res: Res) => {
          res.data.map((item) => {
            item.url = `http://157.122.54.189:9095${item.url}`;
          });
          console.log(res);
          data.figure = res.data;
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    //切换登录注册
    let lognbtn = (index: number): void => {
      data.num = index;
    };
    let code = (): void => {
      //message.success("模拟手机验证码: 000000", 3000);
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