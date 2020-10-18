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
                style="flex:1;display:flex;justify-content: center;align-items:center;height:50px;background-color: rgb(230, 230, 230)"
                @click="back"
              >
                <div class="icon">
                  <SwapOutlined />
                </div>
                <div style="margin-left:5px">往返</div>
              </div>
            </div>
            <div style="position:relative;display:flex;margin:2% 0 0 7%;flex-direction: column;">
              <div class="item">
                <div style="white-space:nowrap">出发城市</div>
                <a-select
                  show-search
                  v-model:value="form.from"
                  placeholder="请搜索出发城市"
                  style="width:80%;margin-left:3%"
                  :default-active-first-option="false"
                  :show-arrow="false"
                  :filter-option="false"
                  :not-found-content="null"
                  @search="fromSearch"
                  @change="fromChange"
                >
                  <a-select-option v-for="d in data" :key="d.value">{{ d.text }}</a-select-option>
                </a-select>
              </div>

              <div class="item">
                <div style="white-space:nowrap">到达城市</div>
                <a-select
                  show-search
                  v-model:value="form.to"
                  placeholder="请搜索到达城市"
                  style="width:80%;margin-left:3%"
                  :default-active-first-option="false"
                  :show-arrow="false"
                  :filter-option="false"
                  :not-found-content="null"
                  @search="handleSearch"
                  @change="handleChange"
                >
                  <a-select-option v-for="d in data" :key="d.value">{{ d.text }}</a-select-option>
                </a-select>
              </div>

              <div class="item">
                <div style="white-space:nowrap">出发时间</div>
                <a-date-picker
                  v-model:value="form.date1"
                  style="width:80%;margin-left:3%"
                  show-time
                  type="date"
                  placeholder="选择日期"
                />
              </div>

              <div class="item1">
                <a-button type="primary" style="width:80%;" @click="onSubmit">
                  <template v-slot:icon>
                    <div
                      style="display:flex;justify-content: center;align-items: center;width:100%;font-size:15px"
                    >
                      <div>
                        <SearchOutlined />
                      </div>
                      <div style="margin-left:5px">搜索</div>
                    </div>
                  </template>
                </a-button>
              </div>
              <!-- 输入框换内容 -->
              <div class="changeaval">
                <div
                  style="width:20px;height:20px;border-top:1px solid grey;border-right:1px solid grey;"
                ></div>
                <div class="change" @click="change">换</div>
                <div
                  style="width:20px;height:20px;border-bottom:1px solid grey;border-right:1px solid grey;"
                ></div>
              </div>
            </div>
          </div>
          <div style="width:65%">
            <img src="../../img/airshow.jpeg" style="width:100%" alt />
          </div>
        </div>
        <!-- 三个保证 -->
        <div class="ensure">
          <div class="ensureContent">
            <div class="ensureIcon" style="color:#409eff">
              <VerifiedOutlined />
            </div>
            <div>100%航协认证</div>
          </div>
          <a-divider type="vertical" style="height:75%;" />
          <div class="ensureContent">
            <div>
              <div class="ensureIcon" style="color: green;">
                <SafetyCertificateOutlined />
              </div>
            </div>
            <div>出行保证</div>
          </div>
          <a-divider type="vertical" style="height:75%;color:grey" />
          <div class="ensureContent">
            <div class="ensureIcon" style="color:#409eff">
              <PhoneOutlined />
            </div>
            <div>7x24小时服务</div>
          </div>
        </div>
        <!-- 特价机票 -->
        <div class="airs">
          <div class="airsconter">
            <div
              v-for="(item,index) in SpecialAir"
              :key="index"
              style="width:24%;position:relative;cursor: pointer;"
              @click="buy(item)"
            >
              <img :src="`${item.url.img}`" style="width:100%;height:150px" alt />
              <div class="ft">{{item.departCity}}-{{item.destCity}}</div>
              <div class="price">￥{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import api from "../../http/api";
import { Form } from "ant-design-vue/types/form/form";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import { message } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
interface Data {
  form: formitem;
  SpecialAir: [];
  addomg: additem[];
}
interface additem {
  img: string;
}
interface formitem {
  from: any;
  to: any;
  date1: any;
  val: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      form: {
        from: undefined,
        to: undefined,
        date1: undefined,
        val: "",
      },
      addomg: [
        { img: "http://157.122.54.189:9095/assets/images/tj01.jpg" },
        { img: "http://157.122.54.189:9095/assets/images/tj02.jpg" },
        { img: "http://157.122.54.189:9095/assets/images/tj03.jpg" },
        { img: "http://157.122.54.189:9095/assets/images/tj04.jpg" },
      ],
      SpecialAir: [],
    });
    onMounted(() => {
      api
        .airs()
        .then((res) => {
          res.data.map((item: any, index: any) => {
            item.url = data.addomg[index];
          });
          data.SpecialAir = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    let back = () => {
      message.warning("目前暂不支持往返，请使用单程选票！");
    };
    let fromSearch = (value: any): void => {
      console.log(value);
      if(value){
          api
        .about({ id: data.id })
        .then((res) => {
          data.about = res.data;
          console.log(res.data);
        })
        .catch((err: any) => {
          console.log(err);
        });
      }
    };
    let change = (): void => {
      data.form.val = data.form.from;
      data.form.from = data.form.to;
      data.form.to = data.form.val;
    };
    let router = useRouter();
    let buy = (item: any) => {
      // console.log(item);
      router.push({
        path: "/ticket",
        query: {
          from: item.departCity,
          to: item.destCity,
        },
      });
    };
    return {
      ...toRefs(data),
      back,
      change,
      buy,
      fromSearch,
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
  background-color: rgb(224, 224, 224);
  font-size: 15px;
  margin-top: 15px;
}
.ft {
  position: absolute;
  bottom: 10px;
  color: white;
  left: 10px;
}
.ensureContent {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ensureIcon {
  font-size: 27px;
}
.airs {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
  padding: 10px 0;
  border: 1px solid rgb(211, 211, 211);
}
.airsconter {
  width: 97.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  position: absolute;
  bottom: 10px;
  color: white;
  right: 10px;
  font-size: 16px;
}
.ant-divider.ant-divider-vertical {
  background-color: rgb(184, 184, 184);
}
.change {
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-color: rgb(138, 138, 138);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12.5px;
}
.changeaval {
  position: absolute;
  top: 17%;
  right: 11%;
}
</style>