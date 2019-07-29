import Vue from 'vue';
import App from './app.vue';

<% if(vuex_router) { %>
import VueRouter from 'vue-router';
import routerConfig from '@modules/router/index-router';
Vue.use(VueRouter);
const router = new VueRouter(routerConfig);

import Vuex from 'vuex';
import storeObj from '@modules/store/index-store';
Vue.use(Vuex);
const store = new Vuex.Store(storeObj);

<% } %>

import api from '@modules/api'; // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上



/* eslint-disable no-new */
new Vue({
    el: '#huya-vue-app',
    <% if(vuex_router) { %>
    router: router,
    store: store,
    <% } %>
    render: h => h(App)
});