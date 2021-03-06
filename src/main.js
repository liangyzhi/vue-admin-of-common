import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'
import Antd from 'ant-design-vue';
import Storage from 'vue-ls';
import qs from "qs";
import VueI18n from 'vue-i18n'
/* 定义全局日期过滤器 */
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
Vue.prototype.$moment = moment
/* 引入md5加密 */
import md5 from "js-md5";
/** 可视化界面图表插件 **/
import viserVue from 'viser-vue'
const options = {
    namespace: '', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'session', // storage name session, local, memory
};
Vue.use(Storage, options);
Vue.use(Antd);
Vue.use(viserVue)
Vue.use(VueI18n);
axios.defaults.baseURL = "/";
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs;
Vue.prototype.$md5 = md5;
/*引入路由控制 */
// import './permission'
// import './mock'
/*ie兼容es6*/
import "babel-polyfill";
import "ant-design-vue/dist/antd.less";
/** 字体框架 **/
import "./assets/css/iconfont/iconfont.js";
/* 引入自己的css、less、js */
import "./assets/css/components.less";
import "./assets/css/common.css";
import "./assets/css/style.less";
/* 引入全局组件 */
import './utils/filter' // global filter

import './mock'
Vue.config.productionTip = false
const i18n = new VueI18n({
    locale: 'zh-CN', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
    messages: {
        'zh-CN': require('../public/lang/zh.json'), // 中文语言包
        'en-US': require('../public/lang/en.json') // 英文语言包
    }
})
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
