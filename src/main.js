import Vue from "vue";
import App from "./App.vue";
import "./assets/main.css";
import utils from "@/utils";

import VueMq from "vue-mq";
import VueScrollactive from "vue-scrollactive";
import VueDragscroll from "vue-dragscroll";
import Vue2TouchEvents from "vue2-touch-events";
import VueScrollTo from 'vue-scrollto';
import vSelect from 'vue-select'

export const bus = new Vue();

Vue.mixin(utils); 

Vue.use(VueMq, {
	breakpoints: {
		sm: 450,
		md: Infinity
	}
});
Vue.use(VueScrollTo)
Vue.use(VueScrollactive);
Vue.use(VueDragscroll);
Vue.use(Vue2TouchEvents);
Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

new Vue({ render: h => h(App) }).$mount("#app");
