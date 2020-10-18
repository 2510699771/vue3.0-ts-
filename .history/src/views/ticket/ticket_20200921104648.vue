<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="leftall">
        <div style="width:100%;margin-top:15px" class="topleft">
          <div style="display:flex">
            <div>单程:</div>
            <div>{{departCity}}-{{destCity}}{{departDate}}</div>
          </div>
          <div style="display:flex">
            <!-- 起飞机场 -->
            <a-select
              v-model:value="value1"
              placeholder="起飞机场"
              style="width: 120px;margin-right:15px"
              ref="select"
              @change="handleChange"
            >
              <a-select-option v-for="(item,index) in airport" :key="index" :value="item">{{item}}</a-select-option>
            </a-select>
            <!-- 起飞时间 -->
            <a-select
              v-model:value="value2"
              placeholder="起飞时间"
              style="width: 120px;margin-right:15px"
              ref="select"
              @change="handleChange3"
            >
              <a-select-option
                v-for="(item,index) in airtime"
                :key="index"
                :value="item"
              >{{item.time}}</a-select-option>
            </a-select>
            <!-- 航空公司 -->
            <a-select
              v-model:value="value3"
              placeholder="航空公司"
              style="width: 120px;margin-right:15px"
              ref="select"
              @change="handleChange1"
            >
              <a-select-option v-for="(item,index) in company" :key="index" :value="item">{{item}}</a-select-option>
            </a-select>
            <!-- 机型 -->
            <a-select
              v-model:value="value4"
              placeholder="机型"
              style="width: 120px;margin-right:15px"
              ref="select"
              @change="handleChange2"
            >
              <a-select-option v-for="(item,index) in airsize" :key="index" :value="item">{{item}}</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- 撤销按钮 -->
        <div style="margin-top:7px">
          筛选:
          <a-button type="info" shape="round" @click="undo" :size="size">撤销</a-button>
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
            style="border: 1px solid rgb(197, 197, 197);margin-top:10px;cursor:pointer"
            @click="show(item)"
          >
            <div class="info" style="margin-top:7px">
              <div>{{item.airline_name}} {{item.flight_no}}</div>
              <div style="font-size: 24px;">{{item.arr_time}}</div>
              <div class="time">2小时20分</div>
              <div style="font-size: 24px;">{{item.dep_time}}</div>
              <div style="display:flex">
                <div>￥</div>
                <span style="color: orange;font-size: 24px;">{{item.base_price/2}}</span>
                <span>起</span>
              </div>
            </div>
            <div class="ticket" v-show="item.show===true">
              <div style="margin-left:2%">低价推荐</div>
              <div class="ticketInfo" style="margin:10px 0">
                <div
                  v-for="(ite,ind) in item.seat_infos"
                  :key="ind"
                  class="soloticketInfo"
                  style="height:80px;"
                >
                  <div style="display:flex;width:55%;font-size: 12px">
                    <div style="color:green">{{ite.group_name}}</div>
                    <div style="margin:0 5px">|</div>
                    <div>{{ite.supplierName}}</div>
                  </div>
                  <div style="font-size:20px;color:orange;">￥{{ite.settle_price}}</div>
                  <div
                    style="width:15%;display:flex;align-items: center;justify-content: center;flex-direction: column;"
                  >
                    <div>
                      <a-button style="background-color:orange;color:white">选定</a-button>
                    </div>
                    <div>剩余:{{ite.discount}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页- -->
        <a-pagination
          style="margin:15px 0"
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
        <div class="lefttopall">
          <div class="lefttop">
            <div>
              <div style="color:skyblue;font-size:25px">
                <VerifiedOutlined />
              </div>
              <div>航协认证</div>
            </div>
            <div>
              <div style="font-size:25px">
                <SafetyCertificateOutlined />
              </div>
              <div>出行保证</div>
            </div>
            <div>
              <div style="color:skyblue;font-size:25px">
                <PhoneFilled />
              </div>
              <div>7x24</div>
            </div>
          </div>
          <div class="phone">免费客服电话：4006345678转2</div>
        </div>
        <div class="historyall">
          <div class="his">
            <div class="historytitle">历史查询</div>
            <div class="hittory">
              <div>
                <div>北京-哈尔滨</div>
                <div>2020-09-22</div>
              </div>
              <div>
                <a-button style="background-color:orange;color:white">选择</a-button>
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
  flights: any;
  flights1: any;
  airport: any;
  airtime: tiemitem[];
  company: any;
  airsize: any;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
}
interface tiemitem {}
interface item {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      departCity: "",
      departCode: "",
      destCity: "",
      destCode: "",
      departDate: "",
      flights: [],
      flights1: [],
      // 分页配置
      // 起飞机场
      airport: [],
      // 起飞时间
      airtime: [],
      //航空公司
      company: [],
      // 飞机型号
      airsize: ["大", "中", "小"],
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
        .then((res: any) => {
          data.airport = res.options.airport;
          data.company = res.options.company;
          res.options.flightTimes.map((item: any) => {
            item.time = item.from + `:00-` + item.to + `:00`;
          });
          res.flights.map((item: any) => {
            item.show = false;
            item.startTime = Number(item.arr_time.slice(0, 2));
          });
          data.airtime = res.options.flightTimes;
          data.total = res.total!;
          data.flights = res.flights;
          data.flights1 = res.flights;
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
    let handleChange = (value: any): void => {
      data.flights = data.flights.filter((item: any) => {
        return (item.org_airport_name = value);
      });
      data.total = data.flights.length;
    };
    let handleChange1 = (value: any): void => {
      data.flights = data.flights1.filter((item: any) => {
        return item.airline_name === value;
      });
      data.total = data.flights.length;
    };
    //起飞时间过滤
    let handleChange3 = (value: any): void => {
      console.log(value);
      data.value2 = value.time;
      data.flights = data.flights1.filter((item: any) => {
        return value.from <= item.startTime < value.to;
      });
      data.total = data.flights.length;
    };
    //飞机型号筛选
    let handleChange2 = (value: any): void => {
      if (value === "大") {
        data.flights = data.flights1.filter((item: any) => {
          return item.plane_size === "L";
        });
      } else if (value === "中") {
        data.flights = data.flights1.filter((item: any) => {
          return item.plane_size === "M";
        });
      } else {
        data.flights = data.flights1.filter((item: any) => {
          return item.plane_size === "S";
        });
      }
      data.total = data.flights.length;
    };
    let show = (item: any): void => {
      if (item.show === true) {
        item.show = false;
      } else if (item.show === false) {
        item.show = true;
      }
    };
    //撤销
    let undo = (): void => {
      data.value1 = "";
      data.value2 = "";
      data.value3 = "";
      data.value4 = "";
    };
    return {
      ...toRefs(data),
      change,
      showSizeChange,
      handleChange,
      handleChange1,
      handleChange2,
      handleChange3,
      undo,
      show,
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
  width: 24%;
  margin-left: 1%;
}
.lefttop {
  display: flex;
  justify-content: space-between;
}
.lefttop > div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.phone {
  margin-top: 15px;
  width: 100%;
  padding-left: 8px;
  background-color: rgb(238, 238, 238);
}
.lefttopall {
  width: 100%;
  border: 1px solid rgb(197, 197, 197);
}
.historytitle {
  font-size: 16px;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(197, 197, 197);
}
.hittory {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}
.historyall {
  width: 100%;
  border: 1px solid rgb(197, 197, 197);
  display: flex;
  justify-content: center;
}
.his {
  width: 97%;
}
.ticket {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgb(246, 246, 246);
}
.ticketInfo {
  width: 75%;
}
.soloticketInfo {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>