let router=[
    {
        path: '*',
        name: 'notFound',
        component: () => import(/* webpackChunkName: "about" */ './notFound.vue')
    },
]
export default router