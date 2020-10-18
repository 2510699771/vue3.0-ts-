<template>
  <div>
    <div class="strategyall">
      <div class="strategy">
        <div style="color:orange;font-size:18px" class="topimg">
          <img src="../../img/air.png" width="30" alt />国内机票
        </div>
        <!-- 单程往返输入框内容 -->
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
            <div
              style="display:flex;justify-content: center;align-items: center;margin-top:20px;flex-direction: column;"
            >
              <div class="item">
                <div>出发城市</div>
                <a-input v-model:value="form.from" style="width:80%" />
              </div>

              <div class="item">
                <div>到达城市</div>
                <a-input v-model:value="form.to" style="width:80%" />
              </div>

              <div class="item">
                <div>出发时间</div>
                <a-date-picker
                  v-model:value="form.date1"
                  style="width:80%"
                  show-time
                  type="date"
                  placeholder="选择日期"
                />
              </div>

              <div class="item1">
                <a-button type="primary" style="width:80%" @click="onSubmit">Create</a-button>
              </div>
            </div>
          </div>
          <div style="width:65%">
            <img src="../../img/airshow.jpeg" style="width:100%" alt />
          </div>
        </div>
        <div class="ensure">
          <div class="ensureContent">
            <div>
              <VerifiedOutlined />
            </div>
            <div>100%航协认证</div>
          </div>
          <a-divider type="vertical" />
          <div class="ensureContent">
            <div>
              <div>
                <SafetyCertificateOutlined />
              </div>
            </div>
            <div>出行保证</div>
          </div>
          <a-divider type="vertical" />
          <div class="ensureContent">
            <div>
              <PhoneOutlined />
            </div>
            <div>7x24小时服务</div>
          </div>
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
  width: 80%;
  justify-content: space-between;
  margin-top: 25px;
  align-items: center;
}

.item1 {
  display: flex;
  width: 80%;
  justify-content: flex-end;
  margin-top: 25px;
}
.ensure {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ensureContent {
  width: 30%;
  display: flex;
  justify-content: ;
}
</style>