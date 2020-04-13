import Vue from 'vue'
import router from './router'
const defaultRoutePath = '/category'
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if(to.meta.isLogin) {
        if (Vue.ls.get('user-token')) {
           next()
        } else {
           next({path:'/login', query: {redirect: to.fullPath} })
        }
    }else {
        next()
    }

})
