<template>
  <div class="loginbcg">
    <div class="login">
      <div class="log">
        <div :class="{shine:data.num===1}" @click="lognbtn">登录</div>
        <div :class="{shine:data.num===1}" @click="registered">注册</div>
      </div>
      <a-form
        ref="Form"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        v-if="num===1"
      >
        <a-form-item>
          <a-input v-model:value="form.username" />
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="form.password" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 20, offset: 2 }">
          <a-button type="primary" style="width:100%" @click="login">登录</a-button>
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
import { Form } from "ant-design-vue";
// import { useForm } from "@ant-design-vue/use";
interface Data {
  form: fromItem;
  rules: rulesItem;
  layout: layItem;
  num: number;
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
interface rulesItem {
  username: runameItem[];
  password: pawordItem[];
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
      num: 1,
      form: {
        username: "",
        password: "",
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
      layout: {
        labelCol: { span: 14 },
        wrapperCol: { span: 14 },
      },
    });
    let login = () => {
      ruleFrom.value!.validate();
    };
    let lognbtn = () => {
      data.num = 1;
    };
    let registered = () => {
      data.num = 2;
    };
    return {
      labelCol: { span: 20, offset: 2 },
      wrapperCol: { span: 20, offset: 2 },
      ...toRefs(data),
      login,
      lognbtn,
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
  border-top-color: orange;
  background: #fff;
  font-weight: 700;
}
</style>