<template>
  <div class="navigation">
    <nav class="nav-extended teal">
      <div class="nav-wrapper">
        <!-- logo -->
        <a href="/" class="brand-logo ml5">User list</a>

        <!-- btn menu  mobile -->
        <a href="#" data-target="mobile-demo" class="sidenav-trigger right"
          ><i class="material-icons">menu</i></a
        >

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link
            tag="li"
            exact
            :to="item.link"
            v-for="item in menu_desc"
            :key="item.link"
            ><i class="material-icons left">{{ item.icon }}</i
            >{{ item.title }}
          </router-link>

          <li @click="logOut">
            <i class="material-icons left">exit_to_app</i>
            Exit
          </li>

          <li class="nav_user">
            <i class="material-icons left"> person </i>{{ LOGIN_NAME }}
          </li>
        </ul>
      </div>
    </nav>

    <ul ref="sidenav" class="sidenav right" id="mobile-demo">
      <router-link
        tag="li"
        exact
        :to="item.link"
        v-for="item in menu_desc"
        :key="item.link"
        ><i class="material-icons left">{{ item.icon }}</i
        >{{ item.title }}
      </router-link>

      <li @click="logOut">
        <i class="material-icons left">exit_to_app</i>
        Exit
      </li>

      <li class="nav_user">
        <div class="sidenav_user">
          <i class="material-icons left"> person </i>{{ LOGIN_NAME }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "v-nav",
  data: () => ({
    menu_desc: [
      { title: "Home", icon: "home", link: "/" },
      { title: "Add user", icon: "person_add", link: "/add" },
      { title: "About", icon: "assignment", link: "/about" },
    ],
  }),
  computed: {
    ...mapGetters(["LOGIN_NAME", "NOTIFICATION"]),
  },
  methods: {
    ...mapActions(["LOGOUT"]),
    logOut() {
      this.LOGOUT({
        notice: {
          message: "You are logged out",
          type: "error",
        },
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
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    window.M.Sidenav.init(this.$refs.sidenav, {
      edge: "right",
    });
  },
};
</script>

<style lang="less" scoped>
.navigation {
  position: relative;
  z-index: 9999;
}
.nav-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
nav li {
  padding: 0 15px;
}
.nav_user {
  cursor: default !important;

  &:hover {
    background-color: transparent;
  }
}
nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.sidenav {
  li:hover,
  li.router-link-active,
  li.router-link-exact-active {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
  li {
    padding-left: 40px;
    i.left {
      margin-top: 11px;
    }
  }
}
.sidenav_user {
  margin-top: 7px;
}

</style>