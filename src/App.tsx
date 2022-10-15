import { defineComponent } from "vue";
import Home from "./views/home";
import logo from "@/assets/logo.png";

export default defineComponent({
  setup() {
    console.log("test");
  },
  render() {
    return (
      <div class="app">
        <img alt="Vue logo" src={logo} />
        <Home />
      </div>
    );
  },
});
