<template>
  <div>
    <AddModalUser>
      <template v-slot:header>
        <router-link
          to="/"
          class="modal-close waves-effect waves-green btn-flat"
          >X</router-link
        >
        <h4>Add User</h4>
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
                <input type="file" ref="file" @change="uploadImage()" />
              </div>
              <div class="file-path-wrapper">
                <input
                  class="file-path validate"
                  type="text"
                  placeholder="Upload image"
                />
              </div>
            </div>

            <div class="input-field col s12 m12 l6">
              <i class="material-icons prefix">account_circle</i>
              <label for="icon_name">Name</label>
              <input
                id="icon_name"
                class="validate"
                type="text"
                v-model.trim="data_form.name"
              />
            </div>

            <div class="input-field col s12 m12 l6">
              <i class="material-icons prefix">phone</i>
              <label for="icon_telephone">Telephone</label>
              <input
                id="icon_telephone"
                type="tel"
                v-model.trim="data_form.phone"
                class="validate"
              />
            </div>

            <div class="input-field col s12 m12 l6">
              <i class="material-icons prefix">markunread</i>
              <label for="icon_email">Email</label>

              <input
                id="icon_email"
                type="tel"
                v-model.trim="data_form.email"
                class="validate"
              />
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
export default {
  name: "Add_user",

  components: {
    AddModalUser: () => import("../components/v-modal-template.vue"),
  },

  data: () => ({
    file: "",
    data_form: {
      image: "",
      name: "",
      phone: "",
      email: "",
    },
  }),

  computed: {
    ...mapGetters(["NOTIFICATION", "NOTIFICATION_ERROR"]),
  },

  methods: {
    ...mapActions(["CREATE_ITEM"]),
    uploadImage() {
      this.file = this.$refs.file.files[0];
    },

    submitForm() {
      const data = new FormData();
      data.append("image", this.file);
      data.append("name", this.data_form.name);
      data.append("phone", this.data_form.phone);
      data.append("email", this.data_form.email);
      this.CREATE_ITEM(data);
    },
  },
  // mounted() {
  //   window.M.Modal.init(this.$refs.modal);
  // },
  watch: {
    NOTIFICATION: function () {
      this.$notify({
        group: "foo",
        type: `${this.NOTIFICATION.type}`,
        text: `<i class="material-icons">info_outline</i> <span>${this.NOTIFICATION.message}</span>`,
      });
      this.$refs.formReset.reset();
   
      
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

<style lang="less" >
.btn_form {
  margin-left: 15px;
  margin-top: 30px;
}
</style>