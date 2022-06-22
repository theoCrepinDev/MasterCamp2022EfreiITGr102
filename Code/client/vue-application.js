const Accueil = window.httpVueLoader("./components/Accueil.vue")
const AjouterVote = window.httpVueLoader("./components/AjouterVote.vue")
const Vote = window.httpVueLoader("./components/Vote.vue")
const ReconaissanceFaciale = window.httpVueLoader("./components/ReconaissanceFaciale.vue")

const routes =[
    {path : '/', component: ReconaissanceFaciale},
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
        listeCandidat: [],
        reponseVoter:{
            code: -1,
            message: ''
        }
    },
    async mounted(){
    },
    methods:{
        async ajouterSuffrage(data){
            await axios.post('/api/suffrage', data).then(async response => {
                console.log(response.message)
            })
                
        },
        async voter(data){
            await axios.post("/api/voter/" + data.votant, data.candidat)
                .then(rep => {
                    this.reponseVoter.code = rep.data.code
                    this.reponseVoter.message = rep.data.message
                })
                .catch(rep => {
                    this.reponseVoter.code = rep.response.data.code
                    this.reponseVoter.message = rep.response.data.message
                })
        }
    }
})