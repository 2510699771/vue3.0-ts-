<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="left">
        <div
          v-for="(item,index) in citys"
          :key="index"
          class="leftbox"
          @mouseenter="getfcus(item,index)"
          @mouseleave="cleanfcus"
        >
          <div class="leftcity">
            <div style="cursor:pointer" class="type">{{item.type}}</div>
            <div style="cursor:pointer">
              <RightOutlined />
            </div>
            <div class="cityinfo" v-if="num===index">
              <div style="width:95%">
                <div v-for="(ite,ind) in item.children" :key="ind" class="citychildren">
                  <div style="font-size:25px;color:orange;">{{ind+1}}</div>
                  <div
                    class="type"
                    style="color: orange;margin-left:15px;word-wrap:nowrap;cursor:pointer"
                  >{{ite.city}}</div>
                  <div
                    class="type"
                    style="margin-left:15px;word-wrap:nowrap;color: gray;cursor:pointer"
                  >{{ite.desc}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="recommendedCity">推荐城市</div>
        <div style="width:100%;height:200px;margin-top:15px">
          <img src="../../img/pic.png" style="width:100%" />
        </div>
        <div class="conter"></div>
      </div>
      <div class="right">
        <!-- 输入框 -->
        <div style="width:100%;border:3px solid orange;display:flex;align-items:center;">
          <input
            v-model="value"
            placeholder="想去的地方，比如:'广州'"
            @search="onSearch"
            style="outline:none;outline-width:0;width:95%"
            class="ant-input-search"
          />
          <div>
            <SearchOutlined style="fontSize:25px;color:orange;font-weight:bolder;" />
          </div>
        </div>
        <!-- 推荐城市 -->
        <div style="width:20%;display:flex;margin-top:15px ">
          <div>推荐:</div>
          <div style="margin-left:10px;cursor:pointer" class="types">广州</div>
          <div style="margin-left:10px;cursor:pointer" class="types">上海</div>
          <div style="margin-left:10px;cursor:pointer" class="types">北京</div>
        </div>
        <!-- 推荐攻略-->
        <div style="width:100%;display:flex;align-items:center;justify-content:;">
          <div
            style="width:11%;color:orange;font-size:20px;height:55px;display:flex;align-items:center;justify-content:center;border-bottom:1.5px solid orange;"
          >推荐攻略</div>
          <div
            style="height:55px;border-bottom:1px solid rgb(219, 219, 219);width:89%;display:flex;align-items:center;justify-content:flex-end;"
          >
            <a-button type="primary">
              <template v-slot:icon>
                <EditOutlined />
              </template>写游记
            </a-button>
          </div>
        </div>
        <!-- 攻略内容 -->
        <div
          v-for="(item,index) in article"
          :key="index"
          style="border-bottom:1px solid rgb(219, 219, 219)"
        >
          <div
            class="title"
            style="height: 50px;display:flex;align-items:center;width:100%;font-size:20px;"
          >{{item.title}}</div>
          <div
            style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;"
          >{{item.summary}}</div>
          <div v-if="item.images.length>0" style="display:flex;width:100%;flex-wrap:wrap;">
            <div v-for="(ite,ind) in item.images" :key="ind" style="width:30%;">
              <img
                :src="`${ite}`"
                v-if="ind%3===0 || ind===0 "
                style="width:100%;height:200px;object-fit:cover;"
              />
              <img
                :src="`${ite}`"
                v-else
                style="width:100%;height:200px;object-fit:cover;margin-left:10px;"
              />
            </div>
          </div>
          <!-- 地点，作者，观看次数，点赞次数 -->
          <div style="display:flex;justify-content:space-between;">
            <div style="display:flex;margin:20px 0 10px 0">
              <div>
                <EnvironmentOutlined />
                {{item.cityName}}
              </div>
              <div style="margin-left:15px">
                by
                <img
                  :src="'http://157.122.54.189:9095'+item.account.defaultAvatar"
                  width="20"
                  height="20"
                  style="border-radius:50%"
                  alt
                />
                {{item.account.nickname}}
              </div>
              <div style="margin-left:15px;display:flex">
                <div>
                  <EyeOutlined />
                </div>
                <div v-if="item.watch" style="margin-left:5px">{{item.watch}}</div>
                <div v-else style="margin-left:5px">0</div>
              </div>
            </div>
            <div
              style="display:flex;margin:20px 0 10px 0;font-size:18px;color:orange"
              v-if="item.like"
            >{{item.like}}赞</div>
            <div style="display:flex;margin:20px 0 10px 0;font-size:18px;color:orange" v-else>0赞</div>
          </div>
        </div>
        <div id="components-pagination-demo-mini" class="page">
          <a-pagination
            size="small"
            :show-total="total => `共${total}条`"
            :total="total"
            show-size-changer
            show-quick-jumper
            :pageSizeOptions="pageSizeOptions"
            :defaultPageSize="defaultPageSize"
            @change="change"
            @showSizeChange="showSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { SearchOutlined } from "@ant-design/icons-vue";
import api from "@/http/api";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
interface Data {
  citys: [];
  num: number;
  value: string;
  city: number;
  article: [];
  total: number;
  pageSizeOptions: pageSizeOptionsItem[];
  defaultPageSize: number;
}
interface pageSizeOptionsItem {}

export default defineComponent({
  name: "",
  props: {},
  components: {
    SearchOutlined,
  },
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      defaultPageSize: 5,
      citys: [],
      value: "",
      num: -1,
      city: 0,
      article: [],
      total: 0,
      pageSizeOptions: ["3", "5", "10", "15"],
    });
    let getfcus = (item: object, index: number): void => {
      data.num = index;
    };
    let cleanfcus = (): void => {
      data.num = -1;
    };
    onMounted(() => {
      // 推荐城市
      api
        .cities()
        .then((res) => {
          data.citys = res.data;
        })
        .catch((err: any) => {
          console.log(err);
        });
      // 文章列表
      api
        .articleList()
        .then((res) => {
          //  console.log(res);
          data.article = res.data;
          data.total = res.total!;
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    let change = (page: any, pageSize: any): void => {
      console.log(page, pageSize, "change");
    };
    let showSizeChange = (current: any, size: any): void => {
      console.log("当前页"current, size, "showSizeChange");
    };
    return {
      ...toRefs(data),
      getfcus,
      cleanfcus,
      change,
      showSizeChange,
    };
  },
});
</script>

<style scoped lang='scss'>
.strategyall {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
}
.strategy {
  width: 60%;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.left {
  width: 30%;
}
.right {
  width: 65%;
}
.recommendedCity {
  width: 100%;
  display: flex;
  height: 60px;
  align-items: center;
  font-weight: bolder;
  font-size: 18px;
  border-bottom: 1px solid rgb(190, 188, 188);
  margin-top: 10px;
}
.leftcity {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bolder;
  margin: 0 15px 0 15px;
  align-items: center;
  height: 45px;
}
.leftbox {
  width: 100%;
  border: 1px solid rgb(202, 202, 202);
}
.cityinfo {
  top: 0;
  min-width: 30%;
  position: absolute;
  left: 30%;
  display: flex;
  justify-content: center;
  background-color: white;
  z-index: 5;
  border: 1px solid rgba(185, 182, 182, 0.63);
}
.citychildren {
  display: flex;
  height: 45px;
  align-items: center;
  flex-wrap: nowrap;
}
.city {
  word-wrap: none;
}
.leftbox:hover {
  color: orange;
  border-right: 0px solid #eee !important;
}
.title:hover {
  color: orange;
}
.type:hover {
  text-decoration: underline;
}
.types:hover {
  text-decoration: underline;
  color: orange;
}
.ant-input-search {
  outline: none;
  border: none;
  height: 38px;
  font-size: 13px;
  text-indent: 1em;
}
#components-pagination-demo-mini .ant-pagination:not(:last-child) {
  margin-bottom: 24px;
}
.page {
  height: 80px;
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>