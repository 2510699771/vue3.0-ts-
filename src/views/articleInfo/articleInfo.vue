<template>
  <div class="strategyall">
    <div class="strategy">
      <div style="width:70%">
        <div>
          <a-page-header style="margin:0" :breadcrumb="{routes}" />
        </div>
        <h1
          style="border-bottom:1px solid rgb(196, 194, 194);height:80px;width:100%;display:flex;align-items: center;font-size:30px;font-weight: bolder;"
        >{{info.title}}</h1>
        <div class="info">
          <div style="margin-right:10px">{{info.updated_at}}</div>
          <div v-if="info.watch">阅读{{info.watch}}</div>
          <div v-else>阅读0</div>
        </div>
        <div class="html" v-html="info.content"></div>
        <div class="icon">
          <div style="margin-right:10px">
            <FormOutlined />
            <div style="font-size: 15px;">评论({{comments.length}})</div>
          </div>
          <div style="margin-left:10px">
            <BranchesOutlined />
            <div style="font-size: 15px;">分享</div>
          </div>
        </div>
        <div>
          <div>评论</div>
          <a-textarea
            v-model:value="value"
            placeholder="说点什么吧"
            :rows="4"
            style="height:50px;word-break:break-all;textarea{outline:none;resize:none;}"
          />
          <div class="updata">
            <a-button type="primary">提交</a-button>
          </div>
          <div class="comments">
            <div
              v-for="(item,index) in comments.slice((current-1)*defaultPageSize,current*defaultPageSize)"
              :key="index"
              class="for"
            >
              <div style="display:flex;margin-left:20px">
                <div>
                  <img
                    src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                    width="20"
                    height="20"
                    alt
                  />
                </div>
                <div style="font-size:15px;font-weight: bolder;margin-left:5px">{{item.account}}</div>
                <div style="margin-left:5px">{{item.created_at}}</div>
              </div>
              <div style="font-size:17px;margin-left:25px;;margin-top:10px">{{item.content}}</div>
            </div>
          </div>
          <a-pagination
            v-if="comments.length>0"
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
      </div>
      <!-- 右侧 -->
      <div style="width:28%;margin-left:10px">
        <div class="about">相关攻略</div>
        <div
          class="aboutinfo"
          v-for="(item,index) in about "
          :key="index"
          style="cursor:pointer"
          @click="goto(item)"
        >
          <div v-if="item.images">
            <img :src="item.images[0]" alt style="width:80px;height:80px" />
          </div>
          <div>
            <div style="font-size: 16.5px;font-weight: bold;margin-top:10px;">{{item.title}}</div>
            <div style="display:flex">
              <div>{{item.updated_at}}</div>
              <div style="margin-left:10px" v-if="item.watch">阅读{{item.watch}}</div>
              <div style="margin-left:10px" v-else>阅读0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import api from "@/http/api";
import { useRoute, useRouter } from "vue-router";
interface Data {
  id: number;
  routes: routesItem[];
  info: [];
  about: [];
  value: string;
  comments: [];
  total: number;
  current: number;
  defaultPageSize: number;
  pageSizeOptions: item[];
}
interface item {}
interface routesItem {
  path: string;
  breadcrumbName: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      total: 0,
      current: 1,
      defaultPageSize: 5,
      pageSizeOptions: ["3", "5", "10", "15"],
      value: "",
      id: 0,
      routes: [
        {
          path: "/Strategy",
          breadcrumbName: "旅游攻略",
        },
        {
          path: "/articleInfo",
          breadcrumbName: "攻略详情",
        },
      ],
      info: [],
      about: [],
      comments: [],
    });
    let router = useRouter();
    let route = useRoute();
    let goto = (item: any): void => {
      router.push({
        path: "/articleInfo",
        query: {
          id: item.id,
        },
      });
      // 推荐城市
      api
        .articleinfo({ id: item.id })
        .then((res) => {
          data.info = res.data[0];
          data.comments = res.data[0].comments;
          data.total = res.data[0].comments.length;
        })
        .catch((err: any) => {
          console.log(err);
        });
      // 相关文章
      api
        .about({ id: item.id })
        .then((res) => {
          data.about = res.data;
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    let change = (page: any, pageSize: any): void => {
      //  console.log("第" + page + "页", "每页" + pageSize + "条数据");
      data.current = page;
    };
    let showSizeChange = (current: any, size: any): void => {
      //  console.log("当前" + current + "页", "每页" + size + "条数据");
      data.defaultPageSize = size;
    };
    onMounted(() => {
      data.id = Number(route.query.id as string);
      // 详情
      api
        .articleinfo({ id: data.id })
        .then((res) => {
          data.info = res.data[0];
          data.comments = res.data[0].comments;
          data.total = res.data[0].comments.length;
        })
        .catch((err: any) => {
          console.log(err);
        });
      // 相关文章
      api
        .about({ id: data.id })
        .then((res) => {
          data.about = res.data;
          console.log(res.data);
        })
        .catch((err: any) => {
          console.log(err);
        });
      // 获取文章评论
      // api
      //   .comments({
      //     post: data.id,
      //     _sort: "正序",
      //     _limit: data.defaultPageSize,
      //     _start: data.current,
      //   })
      //   .then((res) => {
      //     console.log(res, "7qweqeqeqe");
      //   })
      //   .catch((err: any) => {
      //     console.log(err);
      //   });
    });
    return {
      ...toRefs(data),
      goto,
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
  padding: 0;
}
.strategy {
  width: 60%;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.html /deep/ img {
  width: 100%;
}
.html /deep/ p:nth-of-type(5) > img {
  width: 50px;
}
.html /deep/ p {
  font-size: 18px;
}
.comments {
  width: 100%;
  border: 1px solid rgb(206, 206, 206);
  display: flex;
  flex-direction: column;
}
.about {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(201, 201, 201);
  font-size: 16.5px;
  font-weight: bolder;
}
.aboutinfo {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid rgb(201, 201, 201);
  font-size: 13px;
}
.info {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.icon {
  font-size: 35px;
  color: orange;
  display: flex;
  width: 100%;
  justify-content: center;
}
.for {
  width: 100%;
  height: 80px;
  border-bottom: 1px dashed rgb(201, 201, 201);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.updata {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>