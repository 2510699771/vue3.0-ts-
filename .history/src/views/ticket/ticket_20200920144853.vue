<template>
  <div class="strategyall">
    <div class="strategy">
      <div>
        <div>单程:</div>
        <div>{{data.departCity}}-{{data.destCity}}{{data.departDate}}</div>
      </div>
      <div>
        <a-select
          v-model:value="value1"
          style="width: 120px"
          @focus="focus"
          ref="select"
          @change="handleChange"
        >
          <a-select-option value="jack">Jack</a-select-option>
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
</style>