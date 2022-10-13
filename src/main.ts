import vueCompositionApi from "@vue/composition-api";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "./style.scss";

Vue.config.productionTip = false;

Vue.use(vueCompositionApi);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
