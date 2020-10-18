<template>
  <div class="loginbcg">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Activity name" v-bind="validateInfos.name">
        <a-input v-model:value="modelRef.name" />
      </a-form-item>
      <a-form-item label="Sub name" v-bind="validateSubInfos.name">
        <a-input v-model:value="modelRef.sub.name" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px;" @click="reset">Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext ,toRaw } from "vue";
import { Form } from "ant-design-vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({});
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