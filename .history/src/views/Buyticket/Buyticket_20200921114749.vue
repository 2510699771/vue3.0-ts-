<template>
  <div></div>
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
interface Data {
    id:number,
    seat_xid:string
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
        id:0,
        seat_xid:""
    });
    let router = useRouter();
    let route = useRoute();
    onMounted(() => {
      console.log(route.query);
      api
        .choseTicket({id:data.id,})
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>