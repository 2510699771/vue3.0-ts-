个人中心
<template>
 <div>
.Trapezoid {
  height: 0;
  width: 180px;
  border-bottom: 180px solid #2c74e6;
  border-right: 100px solid transparent;
  border: 1px solid red;
}
 </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, SetupContext} from 'vue'
interface Data {
}
 export default defineComponent({
   name: '',
   props: {
   },
   components: {

   },
setup(props, ctx: SetupContext){

let data: Data = reactive<Data>({
})
return {
...toRefs(data),
}
},
 })
</script>

<style scoped lang='scss'>

</style>