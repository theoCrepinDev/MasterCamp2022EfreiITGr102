const Accueil = window.httpVueLoader("./components/Accueil.vue")


const AjouterVote = window.httpVueLoader("./components/AjouterVote.vue")
const Vote = window.httpVueLoader("./components/Vote.vue")
const ReconaissanceFaciale = window.httpVueLoader("./components/ReconaissanceFaciale.vue")
const PrisePhoto = window.httpVueLoader("./components/PrisePhoto.vue");
const EnregistrementModel = window.httpVueLoader("./components/EnregistrementModel.vue");
const Inscription1 = window.httpVueLoader("./components/Inscription1.vue");
const Inscription2 = window.httpVueLoader("./components/Inscription2.vue");

const routes =[
    {path : '/', component: Accueil},
    {path: '/AjouterVote', component: AjouterVote},
    {path: '/vote', component: Vote},
    {path: '/EnregistrementModel', component: EnregistrementModel},
    {path: '/Inscription1', component: Inscription1},
    {path: '/Inscription2', component: Inscription2},
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data:{
        userConnected: {
            CNI : 'Theo'
        },
        listeCandidat: [],
        reponseVoter:{
            code: -1,
            message: ''
        },
        picturelink:''
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
    },
    login(){

    },
    test(){

    },
    pictureTaken(){

    }
})