const Accueil = window.httpVueLoader("./components/Accueil.vue")
const AjouterVote = window.httpVueLoader("./components/AjouterVote.vue")
const Vote = window.httpVueLoader("./components/Vote.vue")
const ReconaissanceFaciale = window.httpVueLoader("./components/ReconaissanceFaciale.vue")
const PrisePhoto = window.httpVueLoader("./components/PrisePhoto.vue");
const Login = window.httpVueLoader("./components/Login.vue");
const Error = window.httpVueLoader('./components/Error.vue');
const Inscription = window.httpVueLoader('./components/Inscription.vue');
const Resultat = window.httpVueLoader('./components/Resultat.vue')


const routes =[
    {path : '/', component: Accueil},
    {path: '/AjouterVote', component: AjouterVote},
    {path: '/vote', component: Vote},
    {path: '/Login', component: Login},
    { path: '/Error', component: Error, name: 'Error' },
    { path: '/Inscription', component: Inscription, name: 'Inscription' },
    {path: '/Resultat', component: Resultat}
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
        },
        pictureTaken(data){
            this.picturelink = data
        },
        test(){
            console.log('mika ma salope')
        }
    }
})