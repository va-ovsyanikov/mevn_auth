<template>
  <div>
    <AddModalUser>
      <template v-slot:header>
        <router-link
          to="/"
          class="modal-close waves-effect waves-green btn-flat"
          >X</router-link
        >
        <h4>Edit User</h4>
      </template>
      <template v-slot:body>
        <div class="row">
          <form
            class="col s12"
            @submit.prevent="submitForm"
            method="post"
            enctype="multipart/form-data"
            ref="formReset"
          >
            <div class="file-field input-field col s12 m12 l6">
              <div class="btn">
                <span>File</span>
                <input type="file" ref="newFile" @change="uploadImage()" />
              </div>
              <div class="file-path-wrapper">
                <input
                  class="file-path validate"
                  type="text"
                  placeholder="New image"
                />
                <img
                  width="160px"
                  :src="`.././image/${FETCH_USER_GET.image}`"
                  alt="user"
                />
              </div>
            </div>

            <div class="input-field col s12 m12 l6">
              <i class="material-icons prefix">account_circle</i>
              <input
                id="icon_name"
                type="text"
                class="validate"
                v-model.trim="FETCH_USER_GET.name"
              />
              <label class="active" for="icon_name">Name</label>
            </div>

            <div class="input-field col s12 m12 l6">
              <i class="material-icons prefix">phone</i>
              <input
                id="icon_telephone"
                type="tel"
                v-model.trim="FETCH_USER_GET.phone"
                class="validate"
              />
              <label class="active" for="icon_telephone">Telephone</label>
            </div>

            <div class="input-field col s12 m12 l6">
              <i class="material-icons prefix">markunread</i>
              <input
                id="icon_email"
                type="tel"
                v-model.trim="FETCH_USER_GET.email"
                class="validate"
              />
              <label class="active" for="icon_email">Email</label>
            </div>

            <button
              class="btn waves-effect waves-light btn_form"
              type="submit"
              name="action"
            >
              Submit
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </template>
    </AddModalUser>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddModalUser from "../components/v-modal-template.vue";
export default {
  name: "Edit",
  components: {
    AddModalUser,
  },
  data: () => ({
    newFile: "",
  }),
  computed: {
    ...mapGetters(["FETCH_USER_GET", "NOTIFICATION", "NOTIFICATION_ERROR"]),
  },
  methods: {
    ...mapActions(["FETCH_USER", "EDIT_ITEM"]),
    uploadImage() {
      this.newFile = this.$refs.newFile.files[0];
    },
    submitForm() {
      const data = new FormData();
      data.append("name", this.FETCH_USER_GET.name);
      data.append("phone", this.FETCH_USER_GET.phone);
      data.append("email", this.FETCH_USER_GET.email);
      data.append("image", this.newFile);
      data.append("oldImage", this.FETCH_USER_GET.image);
      this.EDIT_ITEM({ id: this.$route.params.id, data });
          this.$refs.formReset.reset();
    },
  },
  mounted() {
   
    // window.M.Modal.init(this.$refs.modal);
    this.FETCH_USER(this.$route.params.id);

  },
  watch: {
    NOTIFICATION: function () {
      this.$notify({
        group: "foo",
        type: `${this.NOTIFICATION.type}`,
        text: `<i class="material-icons">info_outline</i> <span>${this.NOTIFICATION.message}</span>`,
      });
      
     
    },
    NOTIFICATION_ERROR: function () {
      for (let i in this.NOTIFICATION_ERROR) {
        let a = i;
        this.$notify({
          group: "foo",
          type: "error",
          text: `<i class="material-icons">cancel</i> <span>${this.NOTIFICATION_ERROR[a].msg}</span>`,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn_form {
  margin-left: 15px;
  margin-top: 30px;
}
</style>