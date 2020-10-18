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
        @finishFailed="handleFinishFailed"
      >
        <a-form-item name="username" required>
          <a-input v-model:value="form.username" placeholder="用户名" />
        </a-form-item>
        <a-form-item name="password" required>
          <a-input v-model:value="form.password" placeholder="密码" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 20, offset: 2 }">
          <a-button type="primary" style="width:100%" @click="handleFinish">登录</a-button>
        </a-form-item>
      </a-form>

      <a-form
        ref="registered"
        :model="form1"
        :rules="rules1"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        v-if="num === 1"
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
          <a-button type="primary" style="width:100%">注册</a-button>
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
import { Form, message } from "ant-design-vue";
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
}
interface pawordItem {
  required: boolean;
  message: string;
  trigger: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let ruleFrom = ref<Form | null>(null);
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
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
      },
      layout: {
        labelCol: { span: 14 },
        wrapperCol: { span: 14 },
      },
    });
    let handleFinish = (values: any) => {
      console.log(e);
    };
    let lognbtn = (index: number): void => {
      data.num = index;
    };
    let code = (): void => {
      message.success("模拟手机验证码: 000000", 3000);
    };
    return {
      labelCol: { span: 20, offset: 2 },
      wrapperCol: { span: 20, offset: 2 },
      ...toRefs(data),
      handleFinish,
      lognbtn,
      code,
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