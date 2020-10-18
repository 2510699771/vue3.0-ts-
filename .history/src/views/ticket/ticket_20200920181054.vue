<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="leftall">
        <div style="width:100%;border:1px solid red" class="topleft">
          <div style="display:flex">
            <div>单程:</div>
            <div>{{departCity}}-{{destCity}}{{departDate}}</div>
          </div>
          <div style="display:flex">
            <a-select
              v-model:value="value1"
              style="width: 120px"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option>Jack</a-select-option>
            </a-select>
            <a-select
              v-model:value="value1"
              style="width: 120px"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option>Jack</a-select-option>
            </a-select>
            <a-select
              v-model:value="value1"
              style="width: 120px"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option>Jack</a-select-option>
            </a-select>
            <a-select
              v-model:value="value1"
              style="width: 120px"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option>Jack</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- 撤销按钮 -->
        <div style="margin-top:7px">
          筛选:
          <a-button type="info" shape="round" :size="size">撤销</a-button>
        </div>
        <div class="infotitle" style="margin-top:15px">
          <div>航空信息</div>
          <div>起飞时间</div>
          <div>到达时间</div>
          <div>价格</div>
        </div>
        <div class="for" style="margin-top:7px">
          <div
            v-for="(item,index) in flights.slice((current-1)*defaultPageSize,current*defaultPageSize)"
            :key="index"
            class="info"
            style="margin-top:7px"
          >
            <div>{{item.airline_name}} {{item.flight_no}}</div>
            <div>{{item.arr_time}}</div>
            <div class="time">2小时20分</div>
            <div>{{item.dep_time}}</div>
            <div>￥{{item.base_price/2}}起</div>
          </div>
        </div>
        <!-- 分页- -->
        <a-pagination
          size="small"
          :show-total="total => `共${total}条`"
          :total="total"
          show-size-changer
          show-quick-jumper
          :current="current"
          :pageSizeOptions="pageSizeOptions"
          :defaultPageSize="defaultPageSize"
          @change="change"
          @showSizeChange="showSizeChange"
        />
      </div>
      <div class="rightall">
        <div>
          <div class="lefttop">
            <div>
              <VerifiedOutlined />
              <div>航协认证</div>
            </div>
            <div>
              <SafetyCertificateOutlined />
              <div>出行保证</div>
            </div>
            <div>
              <PhoneOutlined />
              <div>7x24</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import api from "@/http/api";
import { useRoute, useRouter } from "vue-router";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import nProgress from "nprogress";
interface Data {
  departCity: string;
  departCode: string;
  destCity: string;
  destCode: string;
  departDate: string;
  total: number;
  current: number;
  defaultPageSize: number;
  pageSizeOptions: item[];
  flights: [];
}
interface item {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      departCity: "",
      departCode: "",
      destCity: "",
      destCode: "",
      departDate: "",
      flights: [],
      // 分页配置
      total: 0,
      current: 1,
      defaultPageSize: 5,
      pageSizeOptions: ["3", "5", "10", "15"],
    });
    let router = useRouter();
    let route = useRoute();
    onMounted(() => {
      data.departCity = JSON.parse(route.query.item as string).departCity;
      data.departCode = JSON.parse(route.query.item as string).departCode;
      data.destCity = JSON.parse(route.query.item as string).destCity;
      data.destCode = JSON.parse(route.query.item as string).destCode;
      data.departDate = JSON.parse(route.query.item as string).departDate;
      api
        .JiPiao({
          departCity: data.departCity,
          departCode: data.departCode,
          destCity: data.destCity,
          destCode: data.destCode,
          departDate: data.departDate,
        })
        .then((res) => {
          console.log(res);
          data.total = res.total!;
          data.flights = res.flights!;
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    let change = (page: any, pageSize: any): void => {
      //  console.log("第" + page + "页", "每页" + pageSize + "条数据");
      data.current = page;
    };
    let showSizeChange = (current: any, size: any): void => {
      //  console.log("当前" + current + "页", "每页" + size + "条数据");
      data.defaultPageSize = size;
    };
    return {
      ...toRefs(data),
      change,
      showSizeChange,
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
.topleft {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 0;
}
.leftall {
  width: 75%;
  display: flex;
  flex-direction: column;
}
.infotitle {
  display: flex;
  width: 100%;
  border: 1px solid rgb(197, 197, 197);
  height: 40px;
  background-color: rgb(241, 241, 241);
}
.infotitle > div {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
  display: flex;
  height: 80px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgb(197, 197, 197);
  position: relative;
}
.info > div {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.time {
  position: absolute;
  left: 45%;
  top: 35%;
}
.for {
  width: 100%;
}
.rightall {
  width: 25%;
  border: 1px solid red;
}
.lefttop{
  display: flex;
  justify-content: ;
}
</style>