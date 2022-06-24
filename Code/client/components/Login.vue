
<template>
<div>
  <div class="sec-container">
    <div class="form-wrapper">
      <div class="card">
        <div class="card-header">
          <div id="forLogin" class="form-header active">
            <button @click="switchChoix('Connexion')" >Connexion</button>

          </div>
          <div id="forRegister" class="form-header">
            <button @click="switchChoix('Inscription')">S'inscrire</button>
          </div>
        </div>
        <div class="card-body" id="formContainer" @submit.prevent="login"> 
          <form id="formLogin" v-if="choix==='Connexion'">
              <h1 style="color:#E30000;">BIENVENUE</h1>
              <h10 style="color:#63634;">Entrez vos informations</h10>
              <input type="text" class= "form-control" placeholder="email" v-model="credential.email"/>
              <input type="password" class="form-control" placeholder="Mot de passe" v-model="credential.password"/>
              <button class="formButton">Connexion</button>
          </form>
          <form id="formRegister" v-else @submit.prevent="register" >
               <h1 style="color:#E30000;">INSCRIPTION</h1>
               <h10 style="color:#63634;">Inscrivez vos informations!</h10>
               <h20> Nom</h20>
              <input type="string" class="form-control" placeholder="entrez votre nom" v-model="personneInscription.email"/>
              <h2> Prénom</h2>
              <input type="string" class="form-control" placeholder="entrez votre prénom" v-model="personneInscription.email"/>
              <h2> Email</h2>
              <input type="string" class="form-control" placeholder="Entrez votre email" v-model="personneInscription.email"/>
              <h2> Mots de passe</h2>
              <input type="password" class="form-control" placeholder="*******" v-model="personneInscription.motDePasse"/>
              <h2> Confirmez le mots de passe</h2>
              <input type="password" class="form-control" placeholder= "*******" />
              <button class="formButton">Inscription</button>
          </form>
        </div>
      </div>
    </div>
  </div> 
</div>
   
</template>

<script>

module.exports = {
  props: {
    invaliddata: {type: Boolean, default: false},
    user:{type: Object}
  },
  data() {
    return {
      credential: {email: '', password: ''},
      choix : "Connexion",
      personneInscription:{
        email:'',
        motDePasse:''
      }
    }
  },
  methods: {
    login() {
      this.$emit('login', this.credential)
    },
    switchChoix(choix){
      this.choix=choix
    },
    async register(){
      const res = await axios.post('/api/register', this.personneInscription)
      alert('Utilisateur inscrit')
      this.$router.push('/')
    }  
        
}

  }
</script>

<style scoped>

section {
    display: flex;
    justify-content:center;
    align-items: center;
    margin: 50px 0;
}

.form-wrapper {
  display: flex;
  justify-content:center;
  align-items: center;
  flex: auto;
}

.form-wrapper .card {
  width: 360px;
  padding:20px;
  background-color: white;
}

.card-header {
  display: flex;
  justify-content:left;
  align-items: center;
  margin: 30px 20px 0;
  font-size:1.1rem;
  color:black;
  box-shadow: 2px 3px 8px gray;
  border-radius:50px;
}

.card-header .form-header {
  flex: 50%;
  text-align: center;
  padding: 10px 0;
  border: 1px solid transparent;
  border-radius:50px;
  user-select: none;
  cursor: pointer;
}

.card-body{
  display: flex;
  flex-wrap: nowrap;
  padding: 40px 0;
  text-align: center;
}
form{
  flex:0 0 100%;
}

.toggleForm{
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
}

.form-controle{
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(227, 0, 0, 1);
  background: none;
  outline: none;
  padding: 10px 5px;
  margin-bottom: 20px;
  color: 
rgba(227, 0, 0, 1);
}
/*permet de prendre une couleur particulière*/
.form-control::placeholder{
color:black;
}

.formButton {
border: 1px solid transparent;
padding: 1rem 3rem;
background-color:
rgba(227, 0, 0, 1);
border-radius:50px;
margin-top: 1rem;
font-size: 1rem;
transition: transform 0.3s, box-shadow 0.3s
}

.formButton:hover{
  box-shadow: 3px 5px 115px 
rgba(227, 0, 0, 1);
  transform: translatev(-5px);
}
</style>
