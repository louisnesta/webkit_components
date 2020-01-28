import Vue from "vue";
import App from "./App.vue";
import "./assets/main.css";
import VueScrollactive from "vue-scrollactive";
import VueMq from "vue-mq";

Vue.use(VueScrollactive);
Vue.use(VueMq, {
	breakpoints: {
		sm: 450,
		md: Infinity
	}
});

Vue.config.productionTip = false;

new Vue({ render: h => h(App) }).$mount("#app");
