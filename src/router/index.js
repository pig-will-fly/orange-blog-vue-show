import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index'
    }, {
        path: '/index',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */'../views/Home.vue'),
        children: [{
            path: '/',
            component: () => import(/* webpackChunkName: "BlogMain" */'../components/main/BlogMain.vue')
        }, {
            path: '/index/article/:type',
            component: () => import(/* webpackChunkName: "BlogMain" */'../components/main/BlogMain.vue')
        }, {
            path: '/index/skills/:type',
            component: () => import(/* webpackChunkName: "BlogMain" */'../components/main/BlogMain.vue')
        }, {
            path: '/index/comment',
            name: 'Comment',
            component: () => import(/* webpackChunkName: "Comment" */'../views/Comment.vue')
        }, {
            path: '/index/about',
            name: 'About',
            component: () => import(/* webpackChunkName: "About" */'../views/About.vue')
        }, {
            path: '/index/detail/:id',
            name: 'Detail',
            component: () => import(/* webpackChunkName: "Detail" */'../views/Detail.vue'),
            props: true
        }]
    }
]

const router = new VueRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes
})

router.afterEach(() => {
    scrollTo(0, 0);
});

export default router
