<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td><img :src="`./image/${image}`" alt="alt" /></td>
    <td>{{ name }}</td>
    <td>{{ email }}</td>
    <td>{{ phone }}</td>
    <td>
   
        <i class="material-icons btn_edit" @click="editItem">edit</i>
 

      <i class="material-icons btn_delete" @click="deleteItem">delete</i>
    </td>
   
  </tr>
</template>

<script>
export default {
  name: "v-table-item",
  props: {
    image: {
      type: String,
       default:""
    },
    name: {
      type: String,
       default:""
    },
    email: {
      type: String,
       default:""
    },
    phone: {
      type: Number,
    },
    index: {
      type: Number,
     
    },
    _id:{
      type:String,
    }
  },

  methods: {
    deleteItem() {
      this.$emit("deleteItem");
    },
    editItem() {
      this.$emit("editItem");
        
    },
  },

 
};
</script>

<style lang="less" scoped>
.btn_edit {
  color: #0091ea;
  cursor: pointer;
}
.btn_delete {
  color: #c62828;
  cursor: pointer;
  margin-left: 10px;
}
img {
  width: 85px;
}
</style>