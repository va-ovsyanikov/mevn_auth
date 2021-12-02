<template>
  <AddModalUser>
    <template v-slot:header>
      <h4>Login</h4>
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
          <div class="input-field col s12 m12 l6">
            <i class="material-icons prefix">markunread</i>
            <label class="active" for="icon_email">Email</label>
            <input
              id="icon_email"
              type="email"
              v-model.trim="email"
              class="validate"
            />
          </div>

          <div class="input-field col s12 m12 l6">
            <i class="material-icons prefix">lock</i>
            <label class="active" for="icon_password">Password</label>
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
            Login
            <i class="material-icons right"> login </i>
          </button>

          <router-link
            class="waves-effect waves-light btn register red lighten-2"
            to="/register"
            ><i class="material-icons right"> how_to_reg </i>Register
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
    password: "12345",
    email: "va.ovsyanikov@gmail.com",
  }),
  computed: {
    ...mapGetters([
      "NOTIFICATION",
      "NOTIFICATION_ERROR",
      "NOTIFICATION_ERROR_VALID",
    ]),
  },
  methods: {
    ...mapActions(["LOGIN"]),
    submitForm() {
      this.LOGIN({
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
      this.$router.push({ name: "Home" });
    },
    // NOTIFICATION_ERROR: function () {
    //   this.$notify({
    //     group: "foo",
    //     type: "error",
    //     text: `<i class="material-icons">cancel</i> <span>${this.NOTIFICATION_ERROR.message}</span>`,
    //   });
    // },
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
.register {
  margin-left: 50px;
  margin-top: 27px;
}
@media only screen and (max-width: 480px) {
.register{
margin-left: 22px;
}
}
</style>