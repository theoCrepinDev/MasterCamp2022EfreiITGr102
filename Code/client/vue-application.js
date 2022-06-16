const Accueil = window.httpVueLoader("./components/Accueil.vue")
const Login = window.httpVueLoader('./components/login.vue')

const routes = [
    { path: '/', component: Accueil },
    { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data: {},
    async mounted() {},
    methods: {
        async login(data) {
            await axios.post('/api/login', data).then(async response => {
                this.user = response.data.data;
                console.log(this.user.type)
                    //this.panier.articles = response.data.panier;
                    //router.replace('/catalogue');
            }).catch(error => {
                alert('Veuillez vérifiez vos information')
                this.invaliddata = true
            });

        }
    }
})