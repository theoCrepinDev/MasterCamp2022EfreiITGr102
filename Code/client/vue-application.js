

const Accueil = window.httpVueLoader("./components/Accueil.vue")


const AjouterVote = window.httpVueLoader("./components/AjouterVote.vue")
const Vote = window.httpVueLoader("./components/Vote.vue")
const ReconaissanceFaciale = window.httpVueLoader("./components/ReconaissanceFaciale.vue")
const PrisePhoto = window.httpVueLoader("./components/PrisePhoto.vue");
const EnregistrementModel = window.httpVueLoader("./components/EnregistrementModel.vue");
const Inscription1 = window.httpVueLoader("./components/Inscription1.vue");
const Inscription2 = window.httpVueLoader("./components/Inscription2.vue");
const Connexion = window.httpVueLoader("./components/Login.vue");
const Error = window.httpVueLoader("./components/Error.vue");
const Deconnexion = window.httpVueLoader("./components/Deconnexion.vue");
const About = window.httpVueLoader("./components/Ourteam.vue");
const Resultats = window.httpVueLoader("./components/Resultats.vue");
const CompteRebours = window.httpVueLoader("./components/CompteRebours.vue");

const routes =[
    {path : '/', component: Accueil},
    {path: '/AjouterVote', component: AjouterVote},
    {path: '/vote', component: Vote},
    {path: '/EnregistrementModel', component: EnregistrementModel},
    {path: '/Inscription1', component: Inscription1},
    {path: '/Inscription2', component: Inscription2},
    {path: '/Connexion', component: Connexion},
    {path: '/Error/:textPage', component: Error, props: true},
    {path: '/Deconnexion', component: Deconnexion},
    {path: '/About', component: About},
    {path: '/Resultats', component: Resultats},
    {path: '/CompteRebours', component: CompteRebours},
    {path: '/*', component: Error}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data:{
        userConnected: {
            CNI : '',
            token : '',
            admin : false
        },
        listeCandidat: [],
        reponseVoter:{
            code: -1,
            message: ''
        },
        picturelink:''
    },
    async mounted(){
        const res = await axios.get('/api/utilisateur', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        this.userConnected.CNI = res.data.userCNI;
        this.userConnected.token = res.data.token;
        this.userConnected.admin = res.data.admin;
        localStorage.setItem('token', res.data.token);
        console.log(res.data);
    },
    methods:{

        async ajouterSuffrage(data){
            await axios.post('/api/suffrage', data).then(async response => {
                console.log(response.message)
            })
                
        },
        async connexion(data){
            await axios.get('/api/users/' + data.cni + '/' + data.password)
                .then(rep => {
                    this.userConnected.CNI = rep.data.userCNI
                    this.userConnected.token = rep.data.token
                    this.userConnected.admin = rep.data.admin
                    localStorage.setItem('token', rep.data.token)
                    console.log(rep.data.message)
                })
                .catch(rep => {
                    this.userConnected.CNI = ''
                    this.userConnected.token = ''
                    this.userConnected.admin = false
                    console.log(rep.data.message)
                })
        },
        deconnexion(){
            this.userConnected.CNI = ''
            this.userConnected.token = ''
            this.userConnected.admin = false
            localStorage.removeItem('token')
        }
    },
    login(){

    },
    test(){

    },
    pictureTaken(){

    }
})