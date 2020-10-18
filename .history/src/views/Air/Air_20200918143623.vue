<template>
  <div>
    <div class="strategyall">
      <div class="strategy">
        <div style="color:orange;font-size:18px" class="topimg">
          <img src="../../img/air.png" width="30" alt />国内机票
        </div>
        <div class="middle">
          <div style="width:33%;border:1px solid rgb(199, 199, 199);border-top:1px solid white">
            <div style="width:100%;display:flex; ">
              <div
                style="flex:1;display:flex;justify-content: center;align-items: center;height:50px;border-top:3px solid orange"
              >
                <div class="icon">
                  <SwapRightOutlined />
                </div>
                <div style="margin-left:5px">单程</div>
              </div>
              <div
                style="flex:1;display:flex;justify-content: center;align-items: center;height:50px;background-color: rgb(230, 230, 230)"
              >
                <div class="icon">
                  <SwapOutlined />
                </div>
                <div style="margin-left:5px">往返</div>
              </div>
            </div>
            <div style="display:flex;justify-content: center;align-items: center;margin-top:20px">
              <a-form
                style="width:100%;display:flex;flex-direction: column;"
                ref="ruleForm"
                :model="form"
                :rules="rules"
                labelAlign="left"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
                <a-form-item ref="from" label="出发城市" name="from" class="item">
                  <a-input v-model:value="form.from" style="width:100%" />
                </a-form-item>
                <a-form-item ref="to" label="到达城市" name="to" class="item">
                  <a-input v-model:value="form.to" />
                </a-form-item>
                <a-form-item label="出发事件" name="date1" class="item">
                  <a-date-picker
                    v-model:value="form.date1"
                    show-time
                    type="date"
                    placeholder="选择日期"
                    style="width:50px;border:1px solid red"
                  />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                  <a-button type="primary" @click="onSubmit">Create</a-button>
                  <a-button style="margin-left: 10px;" @click="resetForm">Reset</a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
          <div style="width:65%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Form } from "ant-design-vue/types/form/form";
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      form: {
        from: "",
        to: "",
        date1: undefined,
      },
      rules: {
        from: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        to: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        date1: [
          {
            required: true,
            trigger: "change",
            type: "object",
            message: "验证码不能为空",
          },
        ],
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.strategyall {
  margin-top: 2px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 0;
}
.strategy {
  width: 60%;
  display: flex;
  justify-content: center;
  position: relative;
  flex-direction: column;
}
.topimg {
  height: 50px;
  display: flex;
  align-items: center;
}
.middle {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-between;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: black;
  border: 1px solid rgb(0, 0, 0);
}
.item {
  display: flex;
  margin-right: 0;
  width: 100%;
  justify-content: center;
}
</style>