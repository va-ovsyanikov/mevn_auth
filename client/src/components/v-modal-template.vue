
<template>
  <div>
    <!-- Modal Structure -->
    <div id="modal1" ref="modal" class="modal">
      <div class="modal-content">
    
        <slot name="header"> </slot>
        <slot name="body"> </slot>
      </div>
    </div>
  </div>
</template>  
       
   
   
<script>
export default {
  name: "vModalTemplate",
  mounted() {
    const instance = window.M.Modal.init(this.$refs.modal, {
      dismissible: false,
      endingTop: "20%",
    });

    instance.open();
 
  },
};
</script>
<style land="less" scoped>
.modal-close {
  float: right;
  font-weight: bold;
  font-size: 20px;
}
h4 {
  margin-left: 10px;
}
</style>