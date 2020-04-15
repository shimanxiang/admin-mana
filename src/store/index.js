import Vuex from "vuex";
import Vue from "vue";
import LoginModule from "../pages/login/store";
import TabModule from "../components/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    LoginModule,
    TabModule
  }
});
