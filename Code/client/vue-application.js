const Accueil = window.httpVueLoader("./components/Accueil.vue")
const AjouterVote = window.httpVueLoader("./components/AjouterVote.vue")
const Vote = window.httpVueLoader("./components/Vote.vue")

const routes =[
    {path : '/', component: Accueil},
    {path: '/AjouterVote', component: AjouterVote},
    {path: '/vote', component: Vote}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data:{
        listeCandidat: []
    },
    async mounted(){
    },
    methods:{
        async ajouterSuffrage(data){
            await axios.post('/api/suffrage', data).then(async response => {
                console.log(response.message)
            })
                
        }
    }
})