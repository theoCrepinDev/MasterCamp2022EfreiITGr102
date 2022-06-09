const Accueil = window.httpVueLoader("./components/Accueil.vue")

const routes =[
    {path : '/', component: Accueil}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data:{
    },
    async mounted(){
    },
    methods:{
        
    }
})