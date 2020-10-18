<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="left">
        <div class="title">乘机人</div>
        <div>
          <a-form
            ref="dynamicValidateForm"
            style="width: 100%"
            :model="domains"
            :rules="rules"
          >
            <a-form-item
              style="
                width: 100%;
                height: 180px;
                border-bottom: 1px dotted rgb(219, 219, 219);
              "
              v-for="(domain, index) in domains"
              :key="index"
              :name="['domains', index, 'value']"
            >
              <div>乘机人</div>
              <div
                style="
                  display: flex;
                  width: 100%;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <a-input
                  v-model:value="domain.value"
                  :name="value"
                  style="width: 100%"
                  placeholder="姓名"
                />
                <div
                  style="width: 30%; display: flex; justify-content: flex-end"
                >
                  <MinusCircleOutlined
                    v-if="domains.length > 1"
                    class="dynamic-delete-button"
                    style="margin-right: 10px"
                    :disabled="domains.length === 1"
                    @click="removeDomain(domain)"
                  />
                </div>
              </div>
              <div>证件类型</div>
              <div
                style="
                  display: flex;
                  width: 100%;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <a-input-group compact style="width: 100%">
                  <a-select v-model:value="value1" style="width: 20%">
                    <a-select-option value="value1">身份证</a-select-option>
                    <a-select-option value="value2">护照</a-select-option>
                  </a-select>
                  <a-input
                    :name="value1"
                    v-model:value="domain.value1"
                    style="width: 80%"
                    placeholder="证件号码"
                  ></a-input>
                </a-input-group>
                <div
                  style="width: 30%; display: flex; justify-content: flex-end"
                ></div>
              </div>

              <div></div>
            </a-form-item>
            <a-form-item
              style="
                height: 80px;
                display: flex;
                align-items: center;
                border-bottom: 1px dotted rgb(219, 219, 219);
              "
            >
              <a-button type="info" @click="addDomain">添加乘机人</a-button>
            </a-form-item>
          </a-form>
        </div>
        <div
          style="
            margin-bottom: 20px;
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-bottom: 1px dotted rgb(219, 219, 219);
          "
        >
          <div class="title" style="margin-top: 20px">保险</div>
          <div style="margin: 20px 0 30px 0">
            <div
              v-for="(item1, index1) in arr.insurances"
              :key="index1"
              class="check"
              style="margin: 0 0 25px 0"
            >
              <a-checkbox v-model:checked="item1.checked" @change="onchange"
                >{{ item1.type }}:￥30/份x1 最高赔付{{
                  item1.compensation
                }}</a-checkbox
              >
            </div>
          </div>
        </div>
        <div
          style="
            margin: 20px 0 20px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-bottom: 1px dotted rgb(219, 219, 219);
          "
        >
          <div class="title">联系人</div>
          <div>
            <a-form
              name="custom-validation"
              style="margin-top: 20px"
              ref="shin"
              :model="ruleForm"
              :rules="rules"
            >
              <a-form-item
                required
                label="姓名"
                name="checkPass"
                style="display: flex; width: 80%"
              >
                <a-input
                  v-model:value="ruleForm.checkPass"
                  style="margin-right: 0px; width: 125%; margin-top: 15px"
                  autocomplete="off"
                />
              </a-form-item>
              <a-form-item
                label="手机"
                name="pass"
                style="display: flex; width: 80%"
              >
                <a-input
                  v-model:value="ruleForm.pass"
                  style="width: 125%"
                  autocomplete="off"
                />
              </a-form-item>
              <a-form-item
                ref="codd"
                style="display: flex"
                label="验证码"
                name="age"
              >
                <a-input-search style="width: 72%" v-model:value="ruleForm.age">
                  <template v-slot:enterButton>
                    <a-button @click="code">发送验证码</a-button>
                  </template>
                </a-input-search>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button
                  style="background-color: orange; color: white"
                  @click="info"
                  >提交订单</a-button
                >
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="rightborder">
          <div class="rightconter">
            <div class="rightTop" style="font-size: 16px">
              <div>2020-09-24</div>
              <div>上海-广州</div>
            </div>
            <div class="rightTop" style="font-size: 16px">
              <div>
                <div style="font-size: 22px; font-weight: 400">
                  {{ arr.dep_time }}
                </div>
                <div style="font-size: 12px; color: #999">
                  {{ arr.dst_airport_name }}
                </div>
              </div>
              <div style="font-size: 12px; color: #999">
                {{ arr.plane_name }}
              </div>
              <div>
                <div style="font-size: 22px; font-weight: 400">
                  {{ arr.arr_time }}
                </div>
                <div style="font-size: 12px; color: #999">
                  {{ arr.org_airport_name }}
                </div>
              </div>
            </div>
            <div class="rightTop">
              <div>订单总价</div>
              <div>金额</div>
              <div>数量</div>
            </div>
            <div class="rightTop">
              <div>成人机票</div>
              <div>{{ arr.base_price }}</div>
              <div>x{{ domains.length }}</div>
            </div>
            <div class="rightTop">
              <div>机建＋燃油</div>
              <div>¥50/人/单程</div>
              <div>x{{ domains.length }}</div>
            </div>
            <div class="rightbottom">
              <div>应付总额：</div>
              <div style="font-size: 28px; color: orange">
                ￥{{ arr.base_price * domains.length + 50 * domains.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import api from "@/http/api";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
  ref,
} from "vue";

import { message } from "ant-design-vue";
import { Form } from "ant-design-vue/types/form/form";
interface Data {
  id: number;
  seat_xid: string;
  domains: shine[];
  value1: string;
  value2: string;
  arr: any;
  ruleForm: from;
  rules: ruleitem;
  rules1: ruleitem;
}
interface from {
  pass: string;
  checkPass: string;
  age: string;
}
interface ruleitem {
  pass?: ru[];
  checkPass?: ru[];
  age?: ru[];
  value?: ru[];
  value1?: ru[];
}
interface ru {
  validator?: any;
  trigger?: string;
  required?: boolean;
  message?: string;
  pattern?: RegExp;
}
interface shine {}
export default defineComponent({
  name: "",
  props: {},
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      value1: "身份证",
      value2: "护照",
      id: 0,
      seat_xid: "",
      domains: [{ value: "", value1: "" }],
      arr: {},
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: RegExp(/^1[34578]\d{9}$/),
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        checkPass: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        age: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
      },
      rules1: {
        value1: [
          { required: true, message: "身份证不能为空", trigger: "blur" },
          {
            pattern: RegExp(/(^d{15}$)|(^d{18}$)|(^d{17}(d|X|x)$)/),
            message: "身份证格式错误",
            trigger: "blur",
          },
        ],
        value: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
    });
    let shin = ref<Form | null>(null);
    let codd = ref<Form | null>(null);
    let dynamicValidateForm = ref<Form | null>(null);
    let info = () => {
      shin.value!.validate().then((res: any) => {
        message.success(
          "共计消费" +
            (data.arr.base_price * data.domains.length +
              50 * data.domains.length)
        );
        router.push("/");
      });
    };
    let code = () => {
      if (data.ruleForm.checkPass === "") {
        message.error("请填写手机号");
      } else {
        message.success("验证码发送成功：000000");
      }
    };
    let removeDomain = (item: any): void => {
      let index = data.domains.indexOf(item);
      if (index !== -1) {
        data.domains.splice(index, 1);
      }
    };
    //多选
    let onchange = (e: any): void => {
      console.log(e.target.checked);
    };
    let addDomain = (): void => {
      data.domains.push({
        value: "",
        value1: "",
      });
    };
    let router = useRouter();
    let route = useRoute();
    onMounted(() => {
      data.id = Number(route.query.ota_id as String);
      data.seat_xid = String(route.query.seat_xid as String);
      api
        .choseTicket({ id: data.id, seat_xid: data.seat_xid })
        .then((res: any) => {
          console.log(res);
          res.insurances.map((item: any) => {
            item.checked = false;
          });
          data.arr = res;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      removeDomain,
      addDomain,
      onchange,
      info,
      shin,
      code,
      dynamicValidateForm,
    };
  },
});
</script>

<style scoped lang='scss'>
.strategyall {
  margin-top: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 0;
}
.strategy {
  width: 60%;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.left {
  display: flex;
  width: 55%;
  flex-direction: column;
}
.title {
  display: flex;
  height: 60px;
  font-size: 21px;
  font-weight: bold;
  align-items: center;
}
.dynamic-delete-button {
  cursor: pointer;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.check {
  height: 50px;
  width: 50%;
  border: 1px solid rgb(219, 219, 219);
  display: flex;
  justify-content: center;
  align-items: center;
}
.right {
  width: 42%;
  display: flex;
  justify-content: flex-end;
}
.rightTop {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px dotted rgb(209, 209, 209);
}
.rightbottom {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.rightTop > div {
  margin: 10px 0;
}
.rightconter {
  width: 95%;
  display: flex;
  justify-items: center;
  flex-direction: column;
}
.rightborder {
  width: 80%;
  display: flex;
  justify-content: center;
  border: 1px solid rgb(218, 218, 218);
  height: 320px;
}
</style>