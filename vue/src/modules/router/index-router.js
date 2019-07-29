import index from '@views/index.vue';

// const list = () => import(/* webpackChunkName: "list" */ '@views/list.vue');

export default {
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        // {
        //     path: '/list',
        //     name: 'list',
        //     component: list
        // }
    ]
};