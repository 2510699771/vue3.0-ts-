<template>
  <!-- 切换城市 -->
  <div class="strategyall">
    <div class="strategy">
      <div style="width:100%;display:flex">
        <a-input v-model:value="value" style="width:20%;" placeholder="切换城市" />
        <a-range-picker v-model:value="value1" style="margin-left:15px;" @change="onChange" />
        <a-button
          style="margin-left:12px;width:15%;color: rgb(208, 208, 208);display:flex;justify-content:space-between;align-items: center;font-size:14px;padding:0 10px"
        >
          <template v-slot:icon>
            人数未定
            <SearchOutlined />
          </template>
        </a-button>
        <a-button style="margin-left:12px;" type="primary">查看价格</a-button>
      </div>
      <div style="margin-top:15px;display:flex;justify-content:space-between;">
        <div style="width:59%;">
          <div class="topleft">
            <div style="width:5%">区域:</div>
            <div class="ares">
              <div v-for="(item,index) in ares" :key="index">{{item.name}}</div>
            </div>
          </div>
          <div style="display:flex;margin-top:10px">
            <div>均价</div>
            <a-tooltip placement="topLeft">
              <template v-slot:title>
                <span style="font-size:14px">等级均价由平日价格计算得出，节假日价格会有上浮.</span>
              </template>
              <div class="icon">
                <QuestionOutlined />
              </div>
            </a-tooltip>
            <div style="margin-left:3px">:</div>
            <div style="width:89%;display:flex">
              <a-tooltip placement="bottomLeft">
                <template v-slot:title>
                  <span style="font-size:14px">等级评定是针对房价，设施和服务等各方面水平的综合评估.</span>
                </template>
                <div class="crown">
                  <div style="color:orange">
                    <CrownOutlined />
                    <CrownOutlined />
                    <CrownOutlined />
                    <CrownOutlined />
                  </div>
                  <div>¥521</div>
                </div>
              </a-tooltip>

              <a-tooltip placement="bottomLeft">
                <template v-slot:title>
                  <span style="font-size:14px">等级评定是针对房价，设施和服务等各方面水平的综合评估.</span>
                </template>
                <div class="crown">
                  <div style="color:orange">
                    <CrownOutlined />
                    <CrownOutlined />
                    <CrownOutlined />
                    <CrownOutlined />
                  </div>
                  <div>¥521</div>
                </div>
              </a-tooltip>
              <a-tooltip placement="bottomLeft">
                <template v-slot:title>
                  <span style="font-size:14px">等级评定是针对房价，设施和服务等各方面水平的综合评估.</span>
                </template>
                <div class="crown">
                  <div style="color:orange">
                    <CrownOutlined />
                    <CrownOutlined />
                    <CrownOutlined />
                    <CrownOutlined />
                    <CrownOutlined />
                  </div>
                  <div>¥768</div>
                </div>
              </a-tooltip>
            </div>
          </div>
        </div>
        <div style="width:39%">
          <div id="container"></div>
        </div>
      </div>
      <!-- 选择条件 -->
      <div class="allconditions">
        <!-- 价格步进器 -->
        <div class="choose">
          <div class="price">
            <div>价格</div>
            <div>0-4000</div>
          </div>
          <div style="width:80%">
            <a-slider id="test" v-model:value="value6" :max="4000" :min="0" />
          </div>
        </div>
        <div style="height:60px;">
          <a-divider type="vertical" style="height:100%;" />
        </div>
        <!-- 住宿等级 -->
        <div class="choose">
          <div style="width:80%">
            <div style="line-height:30px">住宿等级</div>
          </div>
          <div style="width:100%;display:flex;justify-content:center">
            <a-select
              v-model:value="value2"
              style="width:80%;border:1px solid  rgb(206, 159, 159,0)"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option
                v-for="(item,index) in selects"
                :key="index"
                :value="item"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div style="height:60px;">
          <a-divider type="vertical" style="height:100%;" />
        </div>
        <!-- 住宿类型 -->
        <div class="choose">
          <div style="width:80%">
            <div style="line-height:30px">住宿类型</div>
          </div>
          <div style="width:100%;display:flex;justify-content:center">
            <a-select
              v-model:value="value3"
              style="width:80%;border:1px solid  rgb(206, 159, 159,0)"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option
                v-for="(item,index) in types"
                :key="index"
                :value="item"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div style="height:60px;">
          <a-divider type="vertical" style="height:100%;" />
        </div>
        <!-- 酒店设施 -->
        <div class="choose">
          <div style="width:80%">
            <div style="line-height:30px">酒店设施</div>
          </div>
          <div style="width:100%;display:flex;justify-content:center">
            <a-select
              v-model:value="value4"
              style="width:80%;border:1px solid  rgb(206, 159, 159,0)"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option
                v-for="(item,index) in assets"
                :key="index"
                :value="item"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div style="height:60px;">
          <a-divider type="vertical" style="height:100%;" />
        </div>
        <!-- 酒店品牌 -->
        <div class="choose">
          <div style="width:80%">
            <div style="line-height:30px">酒店品牌</div>
          </div>
          <div style="width:100%;display:flex;justify-content:center">
            <a-select
              v-model:value="value5"
              style="width:80%;border:1px solid  rgb(206, 159, 159,0)"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option
                v-for="(item,index) in brands"
                :key="index"
                :value="item"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div style="height:60px;">
          <a-divider type="vertical" style="height:100%;" />
        </div>
        <!-- 撤销按钮 -->
        <div class="undo">
          <a-button type="primary">撤销条件</a-button>
        </div>
      </div>
      <!-- 酒店详情 -->
      <div class="info">
        <div v-for="(item,index) in hotel" :key="index" class="soloinfo">
          <div style="flex:2">
            <img :src="item.photos" style="width:100%" alt />
          </div>
          <div style="flex:2">
            <div>{{item.name}}</div>
            <div>
              {{item.alias}}
              <a-rate v-model:value="item.stars" allow-half disabled>
                <template v-slot:character>
                  <CrownOutlined />
                </template>
              </a-rate>
              {{item.hoteltype.name}}
            </div>
            <div>
              <a-rate v-model:value="item.stars" allow-half disabled />
              {{item.stars}}分
              <span>{{item.num_collected}}条评论</span>
              <span>{{item.roomCount}}篇游记</span>
            </div>
            <div>
              <EnvironmentFilled />
              <span>位于：{{item.address}}</span>
            </div>
          </div>
          <div style="flex:1.5">
            <div>
              <div></div>
              <div></div>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { message } from "ant-design-vue";
import api from "@/http/api";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx) {
    let data = reactive({
      value: "", //切换城市
      value1: [],
      ares: [], //区域信息
      selects: [], //住宿等级
      types: [], //类型
      assets: [], //设施
      brands: [], //品牌
      value2: "不限",
      value3: "不限",
      value4: "不限",
      value5: "不限",
      value6: 4000,
      city: 0, //城市id
      hotel: [],
    });
    onMounted(() => {
      //穿件地图实例
      let map = new AMap.Map("container", {
        resizeEnable: true,
      });

      //定位当前城市
      let is = data;
      AMap.plugin("AMap.Geolocation", function () {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          //console.log("定位成功信息：", data.addressComponent.city);
          message.success(`定位当前城市: ${data.addressComponent.city}`);
          //获得当前城市区域信息
          api
            .getcities({ name: data.addressComponent.city })
            .then((res) => {
              is.ares = res.data[0].scenics;
              is.city = res.data[0].id;
              console.log(res);
              api
                .hotel({ city: is.city })
                .then((res) => {
                  is.hotel = res.data;
                  console.log(is.hotel);
                  let markerList = [];
                  res.data.map((item) => {
                    let lat = item.location.latitude;
                    let lng = item.location.longitude;
                    var marker = new AMap.Marker({
                      position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                      title: item.name,
                    });
                    markerList.push(marker);
                  });
                  map.add(markerList);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
          //
          api
            .options()
            .then((res) => {
              is.selects = res.data.levels;
              is.types = res.data.types;
              is.assets = res.data.assets;
              is.brands = res.data.brands;
            })
            .catch((err) => {
              console.log(err);
            });
        }
        function onError(data) {
          // 定位出错
          console.log("定位失败错误：", data);
          // 调用IP定位
          self.getLngLatLocation();
        }
      });
    });
    let onChange = (date, dateString) => {
      console.log(date, dateString);
    };
    let handleChange = () => {};
    let focus = () => {};
    return {
      ...toRefs(data),
      onChange,
      handleChange,
      focus,
    };
  },
});
</script>

<style scoped lang='scss'>
#container {
  width: 100%;
  height: 260px;
}
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
}
.ant-calendar-range-picker-input {
  height: 40px;
}
.area {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.topleft {
  display: flex;
  width: 100%;
}
.ares {
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
}
.ares > div {
  margin-left: 10px;
}
.icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  color: white;
  background-color: rgb(211, 211, 211);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.crown {
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
}
.choose {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.allconditions {
  display: flex;
  width: 100%;
  margin-top: 15px;
  border: 1px solid rgb(219, 219, 219);
  align-items: center;
}
.undo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.price {
  width: 80%;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info {
  width: 100%;
  border: 1px solid red;
  margin-top: 15px;
}
.soloinfo {
  display: flex;
  width: 100%;
}
</style>