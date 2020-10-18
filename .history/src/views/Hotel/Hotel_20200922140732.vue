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
      let local=()=>{}
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