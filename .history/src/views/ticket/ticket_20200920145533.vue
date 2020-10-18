<template>
  <div class="strategyall">
    <div class="strategy">
      <div class="leftall">
        <div style="width:75%;border:1px solid red" class="topleft">
          <div style="display:flex">
            <div>单程:</div>
            <div>{{data.departCity}}-{{data.destCity}}{{data.departDate}}</div>
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
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { useRoute, useRouter } from "vue-router";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
interface Data {
  data: [];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      data: [],
    });
    let router = useRouter();
    let route = useRoute();
    onMounted(() => {
      data.data = JSON.parse(route.query.item as string);
      console.log(data.data);
    });
    return {
      ...toRefs(data),
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
.leftall{
  
}
</style>