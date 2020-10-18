<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="left">
        <div class="title">乘机人</div>
        <div>
          <a-form ref="dynamicValidateForm" style="width:100%;" v-bind="formItemLayoutWithOutLabel">
            <a-form-item
              style="width:100%;height:180px;border-bottom:1px dotted  rgb(219, 219, 219)"
              v-for="(domain, index) in domains"
              :key="index"
              v-bind="index === 0 ? formItemLayout : {}"
              :name="['domains', index, 'value']"
            >
              <div>乘机人</div>
              <div
                style="display:flex;width:100%;align-items:center;justify-content:space-between;"
              >
                <a-input v-model:value="domain.value" style="width:100%" placeholder="姓名" />
                <div style="width:30%;display:flex;justify-content:flex-end;">
                  <MinusCircleOutlined
                    v-if="domains.length > 1"
                    class="dynamic-delete-button"
                    style="margin-right:10px"
                    :disabled="domains.length === 1"
                    @click="removeDomain(domain)"
                  />
                </div>
              </div>
              <div>证件类型</div>
              <div
                style="display:flex;width:100%;align-items:center;justify-content:space-between;"
              >
                <a-input-group compact style="width:100%">
                  <a-select v-model:value="value1" style="width:20%">
                    <a-select-option value="value1">身份证</a-select-option>
                    <a-select-option value="value2">护照</a-select-option>
                  </a-select>
                  <a-input v-model:value="domain.value1" style="width:80%" placeholder="证件号码"></a-input>
                </a-input-group>
                <div style="width:30%;display:flex;justify-content:flex-end;"></div>
              </div>

              <div></div>
            </a-form-item>
            <a-form-item
              style="height:80px;display:flex;align-items:center;border-bottom:1px dotted  rgb(219, 219, 219)"
            >
              <a-button type="info" @click="addDomain">添加乘机人</a-button>
            </a-form-item>
          </a-form>
        </div>
        <div
          style="margin-bottom:20px;height:200px;display:flex;flex-direction: column;justify-content: center;border-bottom:1px dotted  rgb(219, 219, 219)"
        >
          <div class="title" style="margin-top:20px">保险</div>
          <div style="margin:20px 0 30px 0">
            <div
              v-for="(item1,index1) in arr.insurances"
              :key="index1"
              class="check"
              style="margin:0 0 25px 0"
            >
              <a-checkbox
                v-model:checked="item1.checked"
                @change="onchange"
              >{{item1.type}}:￥30/份x1 最高赔付{{item1.compensation}}</a-checkbox>
            </div>
          </div>
        </div>
        <div class="title">联系人</div>
        <div>
          <a-form
            name="custom-validation"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            v-bind="layout"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
          >
            <a-form-item required has-feedback label="Password" name="pass">
              <a-input v-model:value="ruleForm.pass" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="Confirm" name="checkPass">
              <a-input v-model:value="ruleForm.checkPass" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="Age" name="age">
              <a-input-number v-model:value="ruleForm.age" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" html-type="submit">Submit</a-button>
              <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div></div>
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
} from "vue";
interface Data {
  id: number;
  seat_xid: string;
  domains: shine[];
  value1: string;
  value2: string;
  arr: object;
  ruleForm:from
  rules:ruleitem
}
interface from{
    pass:string
    checkPass:string
    age:string
}
interface ruleitem{
    pass:ru[]
    checkPass:ru[],
    age:ru[]
}
interface ru{
    validator?:any,
    trigger?:string;
    required?:boolean
    message?:string
    pattern?:RegExp
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
      domains: [],
      arr: {},
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
       rules: {
        pass: [{required:true,message:"手机号不能为空",trigger:"blur"},{pattern:RegExp(/^1[34578]\d{9}$/),message:"手机号格式错误",trigger: "blur",
          }],
        checkPass:[{  required: true, message: "手机号不能为空", trigger: "blur"}],age: [{  required: true, message: "手机号不能为空", trigger: "blur}],
      age:[]
      },
    }
    });
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
</style>