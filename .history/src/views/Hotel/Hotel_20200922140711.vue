<template>
  <div style="height: 300px;">
   <div id="container"></div> 
  </div>
</template>

<script >
import { defineComponent, reactive, toRefs, SetupContext, onMounted } from "vue";
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx) {
    let data  = reactive({});
    onMounted(()=>{
      let map = new AMap.Map('container');
      //自动获取用户IP，返回当前城市
    citysearch.getLocalCity(function(status: string, result: any) {
      if (status === "complete" && result.info === "OK") {
        if (result && result.city && result.bounds) {
          console.log(result)
          const cityinfo = result.province+''+result.city;
          that.cityinfo = cityinfo;
        }
      }
    });
    })
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
#container {width:300px; height: 180px; }  
</style>