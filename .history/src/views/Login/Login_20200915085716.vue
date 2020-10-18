<template>
  <div class="loginbcg">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item v-bind="validateInfos.name">
        <a-input v-model:value="ruleForm.username" />
      </a-form-item>
      <a-form-item v-bind="validateSubInfos.name">
        <a-input v-model:value="ruleForm.password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang='ts'>
import { defineComponent, toRefs, SetupContext, reactive, toRaw } from "vue";
import { Form } from "ant-design-vue";
// import { useForm } from "@ant-design-vue/use";
interface Data {
  ruleForm: fromItem;
  rules: rulesItem;
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
  message: string;
  trigger: string;
  required？: boolean;
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
    let data: Data = reactive<Data>({
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 12, message: "账号长度为3-12位之间", trigger: "blur" },
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.loginbcg {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
}
</style>