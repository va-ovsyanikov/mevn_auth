<template>
  <div class="app">
    <component :is="layout">
    </component>
    <notifications group="foo" position="bottom right" />
  </div>
</template>

<script>
  import authLayout  from "./layots/auth.layout.vue"
  import mainLayout  from "./layots/main.layout.vue"
export default {
  name: "App",
  components: {
    authLayout,
    mainLayout
  },
  computed: {
    layout(){
      return (this.$route.meta.layout) + "-layout";
    },
  },

};
</script>
<style  lang="less">
body {
  overflow: auto !important;
}

.vue-notification {
  padding: 18px !important; 
  font-size: 16px !important;
  cursor: pointer;
}
.notification-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  i {
    margin-right: 10px;
    font-size: 20px;
  }
}
.sidenav-overlay {
  z-index: 3000!important;
}
</style>


