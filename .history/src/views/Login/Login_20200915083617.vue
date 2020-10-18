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
        <a-button type="primary">Create</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang='ts'>
import { defineComponent, toRefs, SetupContext, reactive, toRaw } from "vue";
import { Form } from "ant-design-vue";
// import { useForm } from "@ant-design-vue/use";
interface Data {}
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
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        age: [{ validator: checkAge, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
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