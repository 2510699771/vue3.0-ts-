<template>
  <div style="height: 300px;">
   <div id="container"></div> 
  </div>
</template>

<script >
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx) {
    let data  = reactive({});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
#container {width:300px; height: 180px; }  
</style>