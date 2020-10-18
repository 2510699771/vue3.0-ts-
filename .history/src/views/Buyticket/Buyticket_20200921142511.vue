<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="left">
        <div class="title">乘机人</div>
        <div>
          <a-form
            ref="dynamicValidateForm"
            :model="dynamicValidateForm"
            v-bind="formItemLayoutWithOutLabel"
          >
            <a-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :key="domain.key"
              v-bind="index === 0 ? formItemLayout : {}"
              :label="index === 0 ? 'Domains' : ''"
              :name="['domains', index, 'value']"
              :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'change',
      }"
            >
              <a-input
                v-model:value="domain.value"
                placeholder="姓名"
                style="width: 60%; margin-right: 8px"
              />
              <MinusCircleOutlined
                v-if="domains.length > 1"
                class="dynamic-delete-button"
                :disabled="dynamicValidateForm.domains.length === 1"
                @click="removeDomain(domain)"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayoutWithOutLabel">
              <a-button type="dashed" style="width: 60%" @click="addDomain">
                <PlusOutlined />Add field
              </a-button>
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
  formItemLayoutWithOutLabel: labelitem;
  formItemLayout: layout;
}
interface layout {
  labelCol: colem;
  wrapperCol: colem;
}
interface colem {
  xs: xsitem1;
  sm: xsitem1;
}
interface xsitem1 {
  span: number;
}
interface labelitem {
  wrapperCol: colitem;
}
interface colitem {
  xs: xsitem;
  sm: xsitem;
}
interface xsitem {
  span: number;
  offset: number;
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
      id: 0,
      seat_xid: "",
      domains: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
    });
    let removeDomain = (item: any): void => {
      let index = data.domains.indexOf(item);
      if (index !== -1) {
        data.domains.splice(index, 1);
      }
    };
    let addDomain = (): void => {
      console.log(data.domains);

      //   data.domains.push({
      //     value: "",
      //     key: Date.now(),
      //   });
    };
    let router = useRouter();
    let route = useRoute();
    onMounted(() => {
      console.log(route.query);
      data.id = Number(route.query.ota_id as String);
      data.seat_xid = String(route.query.seat_xid as String);
      api
        .choseTicket({ id: data.id, seat_xid: data.seat_xid })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      removeDomain,
      addDomain,
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
  border: 1px solid rgb(0, 43, 235);
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
  position: relative;
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
</style>