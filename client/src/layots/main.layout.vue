<template>
  <div>
  <vNav/>
   <router-view/>
  </div>
  
</template>

<script>
import vNav from "../components/v-nav.vue";
export default {
  name: "App-layout",
  components:{
    vNav
  },

};
</script>

<style lang="less" scoped>
</style>