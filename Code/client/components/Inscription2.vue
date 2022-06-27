<template>
<div class="container row div-page-inscription" @submit.prevent="confirmerInscription">

<div id="image-fond" class="col-md-6 col-lg-6"></div>
<div class="col-md-6 col-lg-6">

<form id="form-connexion" >
  <h1 style="color:#E30000;">FINALISEZ VOTRE INSCRIPTION</h1>
  <h2 style="color:#63634;">Inscrivez vos informations !</h2>

   <div class="form-group1">
    <label for="InputEmail">Email</label>
    <input type="Email" class="form-control" id="InputEmail" placeholder="Entrer votre Email" v-model="userInformations.email" 
    required>
  </div>

   <div class="form-group2">
      <label for="InputPassword">Mot de passe</label>
      <input type="password" class="form-control" id="InputPassword" placeholder="*********" v-model="userInformations.password" required>
   </div>

   <div class="form-group3">
      <label for="InputPassword">Confirmer votre Mots de passe </label>
      <input type="password" class="form-control" id="InputPasswordConfirmation" placeholder="*********" v-model="userInformations.password_confirmation" required>
   </div>

<button type="submit" class="btn btn-danger btn-lg btn-block">Inscription</button>
<p class="lien"> Vous avez déjà un compte ? <a href="/Connexion" style="color:#E30000;" >Connectez-vous </a> </p>


  </form>

</div>
</div>
  
</template>

<script>

module.exports = {
  props: {
    userInformations: {type: Object},
  },
  mounted() {
    this.userInformations.email = '';
    this.userInformations.password = '';
    this.userInformations.password_confirmation = '';
  },
  methods: {
    async confirmerInscription() {
      if(this.userInformations.password === this.userInformations.password_confirmation){
        await axios.post('/api/users', this.userInformations)
        .then(response => {
          console.log(response.data);
          this.$router.push('/Connexion');
        })
        .catch(error => {
          console.log(error);
        });
      }else{
        alert("Les mots de passe ne correspondent pas");
      }
    }
  }
}

</script>


<style scoped>
h1 {
  text-align: center;
  font-size:40px;
  line-height:87px;
 
}

h2 {
  color:grey;
  text-align:center;
  font-size: 19px;
  line-height: 39px;
   margin-top: -5%;
   font-size:medium;
}


.btn-danger{
  margin-left: 70px;
  margin-top: 5%;
  width: 60%;

}

.form-group1 {
  margin-top: 5%;
}

.form-group2{
  margin-top: 5%;
}
.form-group3{
  margin-top: 5%;
}
.lien{
  margin-left: 125px;
  margin-top: 5%;
  font-family: "Gill Sans", sans-serif;
  font-size: smaller;
}


#image-fond {
background-image:url("../assets/vote.png");
background-color: rgba(234, 234, 234, 1);
background-repeat: no-repeat;
background-size: contain;
margin-left: -25px;
margin-right: auto;
max-width: 900%;

}

.div-page-inscription{
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.btn-danger{
     margin-left: 95px;
}
</style>