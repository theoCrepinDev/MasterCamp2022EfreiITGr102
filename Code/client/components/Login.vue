<template>
<div class="container row div-page-connexion">
  <div id="image-fond" class="col-md-6 col-lg-6">

  </div>
  <div class="col-md-6 col-lg-6">
  
   <form id="form-connexion" @submit.prevent="connexion()">
      <h1 style="color:#E30000;">BIENVENUE</h1>
      <h2 style="color:#63634;">Entrez vos informations !</h2>

      <div class="form-group1">
        <label for="InputEmail1">Numéro CNI</label>
        <input type="CNI" v-model="userInformations.cni" class="form-control" id="InputCNI" aria-describedby="CNI" placeholder="Entrez votre numéro CNI">
      </div>

      <div class="form-group2">
        <label for="InputPassword">Mot de passe</label>
        <input type="password" v-model="userInformations.password" class="form-control" id="InputPassword" placeholder="*********" autofocus="" required="">
      </div>
      <button type="submit" class="btn btn-danger btn-block">Connexion</button>
        <p class="lien"> Vous n'avez pas de compte ? <a href="/#/Inscription1" style="color:#E30000;" >Inscrivez-vous gratuitement </a> </p>
      
    </form> 

  </div>
</div>
</template>

<script>

module.exports  = {
  props:{
    userConnected: {type: Object},
  },
  data(){
    return{
      userInformations: {
        cni: '',
        password: '',
      },
    }
  },
  methods: {
    connexion(){
      this.$emit('connexion', this.userInformations)
      this.$router.push('/')
    },
  }
}

</script>


<style scoped>




#image-fond {
background-image:url("../assets/logo.png");
background-color: rgba(234, 234, 234, 1);
background-repeat: no-repeat;
background-size: contain;
margin-left: auto;
margin-right: -500px;;
max-width: 900%;

}

#form-connexion {
  width:80%;
  margin-top:13%;
  margin-left:-120%; 
  height: 610px;
}

h1 {
  text-align: center;
  font-size:42px;
  line-height:87px;
 
}

h2 {
  color:#636364;
  text-align:center;
  font-size: 19px;
  line-height: 39px;
  margin-top: -3.5%;
}

.btn-danger{
  margin-left: 22.5%;
  margin-top: 5%;
  width: 60%;

}

.form-group2 {
  margin-top: 7%;
}

.form-group1{
  margin-top: 11%;
}

.lien{
  margin-left: 50px;
  margin-top: 5%;
  font-family: "Gill Sans", sans-serif;
  font-size: smaller;
}
.div-page-connexion{
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
</style>