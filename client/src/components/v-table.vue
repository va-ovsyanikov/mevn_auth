<template>
      <div class="vTable">
        <table class="striped centered responsive-table">
          <thead class="teal thead z-depth-2">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <vTableItem
              v-for="(item, index) in FETCH_USERS_GET"
              :key="item.id"
              :image="item.image"
              :name="item.name"
              :email="item.email"
              :phone="item.phone"
              :index="index"
              @deleteItem="deleteItem(item._id)"
              @editItem="editItem(item._id)"
            />
          </tbody>
        </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vTableItem from "./v-table-item.vue";
export default {
  name: "Table",
  data: () => ({
    notice: "",
  }),
  components: {
    vTableItem,
  },
  computed: {
    ...mapGetters(["FETCH_USERS_GET", "NOTIFICATION"]),
  },
  methods: {
    ...mapActions(["FETCH_USERS", "DELETE_ITEM"]),

    deleteItem(id) {
      if(window.confirm("Are you sure you want to remove the item")){
this.DELETE_ITEM(id);
      }
      
    },
    editItem(id) {
      this.$router.push({ name: "Edit", params: { id: id } });
    },
  },
  mounted() {
    this.FETCH_USERS();
  },
  watch: {
    NOTIFICATION: function () {
      this.$notify({
        group: "foo",
        type: `${this.NOTIFICATION.type}`,
        text: `<i class="material-icons">info_outline</i> <span>${this.NOTIFICATION.message}</span>`,
      });
    },
  },
};
</script>

<style lang="less" >
.vTable {
  max-width: 1200px;
  margin: 70px auto 70px;
  thead {
    th {
      border-radius: 0;
      color: #fff;
    }
  }
  table.centered thead th{
    height: 63px;
}
}



@media only screen and (max-width: 1200px) {
.vTable{
  margin-left: 15px;
  margin-right: 15px;
}
}
</style>