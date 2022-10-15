import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "virtual:windi.css";
import "./style.scss";
import { VueSvgIcon } from "@yzfe/vue-svgicon";
import "@yzfe/svgicon/lib/svgicon.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.component("icon", VueSvgIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
