import Vue from "vue";
import App from "./App.vue";
import ResponseViewer from "./ResponseViewer.vue"
import store from './store'

Vue.component("response-viewer", ResponseViewer);
Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    store,
}).$mount("#app");
