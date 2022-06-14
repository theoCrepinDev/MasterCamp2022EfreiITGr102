const Accueil = window.httpVueLoader("./components/Accueil.vue")
const AjouterVote = window.httpVueLoader("./components/AjouterVote.vue")

const routes =[
    {path : '/', component: AjouterVote},
    {path: '/test', component: Accueil}
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
        const res = await axios.get('/api/candidats');
        this.listeCandidat = res.data;
    },
    methods:{
        async ajouterSuffrage(data){
            await axios.post('/api/suffrage', data).then(async response => {
                console.log(response.message)
            })
                
        }
    }
})