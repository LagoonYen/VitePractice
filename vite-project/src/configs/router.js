import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const constantRoutes = [

    {
        path: '/',
        component: () => import('@/views/mainPage.vue'),
        hidden: true,
    },,
    {
        path: '/register',
        component: () => import('@/views/register.vue'),
        hidden: true,
    },
    {
        path: '/signIn',
        component: () => import('@/views/signIn.vue'),
        hidden: true,
    },
    {
        path: '/elementCalendar',
        component: () => import('@/views/elementCalendar.vue'),
        hidden: true,
    },
    {
        path: '/elementCarousel',
        component: () => import('@/views/elementCarousel.vue'),
        hidden: true,
    },
    {
        path: '/elementTimeline',
        component: () => import('@/views/elementTimeline.vue'),
        hidden: true,
    },
    {
        path: '/vuetifyCalendar',
        component: () => import('@/views/vuetifyCalendar.vue'),
        hidden: true,
    },
    {
        path: '/fullCalendar',
        component: () => import('@/views/fullCalendar.vue'),
        hidden: true,
    },
    {
        path: '/chartjs',
        component: () => import('@/views/chartjs.vue'),
        hidden: true,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/timeLine',
        component: () => import('@/views/timeLine.vue'),
        hidden: true,
        meta:{
            requiresAuth: true
        }
    },
    
    {
        path: '/practicePageA',
        component: () => import('@/views/practicePageA.vue'),
        hidden: true,
    },
    {
        path: '/realTimeChat',
        component: () => import('@/views/realTimeChat.vue'),
        hidden: true,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/realTimeChatEach',
        component: () => import('@/views/realTimeChatEach.vue'),
        hidden: true,
        meta:{
            requiresAuth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}

router.beforeEach((to, from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)){
        if(getAuth().currentUser){
            next();
        }
        else{
            alert("尚未登入");
            next("/SignIn")
        }
    }
    else{
        next();
    }
})

export default router