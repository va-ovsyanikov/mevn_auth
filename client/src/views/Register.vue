<template>
  <AddModalUser>
    <template v-slot:header>
      <h4>Register</h4>
    </template>
    <template v-slot:body>
      <div class="row">
        <form
          class="col s12"
          @submit.prevent="submitForm"
          method="post"
          ref="formReset"
          action="#"
          enctype="multipart/form-data"
        >
          <div class="input-field col s12 m12 l6">
            <i class="material-icons prefix">account_circle</i>
            <label for="icon_name">Name</label>
            <input
              id="icon_name"
              class="validate"
              type="text"
              v-model.trim="name"
            />
          </div>

          <div class="input-field col s12 m12 l6">
            <i class="material-icons prefix">markunread</i>
            <label for="icon_email">Email</label>
            <input
              id="icon_email"
              type="email"
              v-model.trim="email"
              class="validate"
            />
          </div>

          <div class="input-field col s12 m12 l6">
            <i class="material-icons prefix">lock</i>
            <label for="icon_password">Password</label>
            <input
              id="icon_password"
              type="text"
              v-model.trim="password"
              class="validate"
            />
          </div>

          <button
            class="btn waves-effect waves-light btn_form"
            type="submit"
            name="action"
          >
            <i class="material-icons right"> add </i>
            Created
          </button>

          <router-link
            class="waves-effect waves-light btn register login red lighten-2"
            to="/login"
            ><i class="material-icons right"> login </i>Login
          </router-link>
        </form>
      </div>
    </template>
  </AddModalUser>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Add_user",
  components: {
    AddModalUser: () => import("../components/v-modal-template.vue"),
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
  }),
  computed: {
    ...mapGetters([
      "NOTIFICATION",
      "NOTIFICATION_ERROR",
      "NOTIFICATION_ERROR_VALID",
    ]),
  },
  methods: {
    ...mapActions(["REGISTER"]),
    submitForm() {
      this.REGISTER({
        name: this.name,
        email: this.email,
        password: this.password,
      });
    },
  },
  watch: {
    NOTIFICATION: function () {
      this.$notify({
        group: "foo",
        type: `${this.NOTIFICATION.type}`,
        text: `<i class="material-icons">info_outline</i> <span>${this.NOTIFICATION.message}</span>`,
      });
      this.$refs.formReset.reset();
      this.$router.push({ name: "Login" });
    },
    NOTIFICATION_ERROR: function () {
      this.$notify({
        group: "foo",
        type: "error",
        text: `<i class="material-icons">cancel</i> <span>${this.NOTIFICATION_ERROR.message}</span>`,
      });
    },
    NOTIFICATION_ERROR_VALID: function () {
      console.log(this.NOTIFICATION_ERROR_VALID);
      for (let i in this.NOTIFICATION_ERROR_VALID) {
        let a = i;

        this.$notify({
          group: "foo",
          type: "error",
          text: `<i class="material-icons">cancel</i> <span>${this.NOTIFICATION_ERROR_VALID[a].msg}</span>`,
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
.login {
  margin-left: 50px;
  margin-top: 27px;
}

@media only screen and (max-width: 480px) {
  .login {
    margin-left: 22px;
  }
}
</style>