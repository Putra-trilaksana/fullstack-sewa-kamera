import "bootstrap/dist/css/bootstrap.css"
import { createApp } from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies"
import router from "./router";
import 'bootstrap/dist/js/bootstrap.js'
import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(VueCookies);

app.mount("#app");
