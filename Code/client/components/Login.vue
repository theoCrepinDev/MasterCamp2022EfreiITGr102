<template>
<div class="container row">
  <div class="row">
    <div id="image-fond" class="col col-md-6" src="../assets/logo.jpg"></div>
  </div>
  
    <div class="col-md-15">
    <form id="form-connexion">
      <h1 style="color:#E30000;">BIENVENUE</h1>
      <h2 style="color:#63634;">Entrez vos informations !</h2>

      <div class="form-group1">
        <label for="InputEmail1">Email</label>
        <input type="email" class="form-control" id="InputEmail" aria-describedby="Email" placeholder="Entrez votre email">
      </div>

      <div class="form-group2">
        <label for="InputPassword">Mot de passe</label>
        <input type="password" class="form-control" id="InputPassword" placeholder="*********" autofocus="" required="">
      </div>

  <button type="Connexion" class="btn btn-primary btn-block">Connexion</button>
  <p class="lien"> Vous n'avez pas de compte ? <a href="/Inscription" style="color:#E30000;" >Inscrivez-vous gratuitement </a> </p>
</form> 
  </div>
</div>
</template>

<style scoped>


#image-fond{
  position: absolute;
  width: 380px;
  height: 414.77px;
  margin-right: 6%; 
}
/*
.col-md-6 {
  background-color:#EAEAEA;
}
*/
#form-connexion {
  width:25%;
  margin-top:10%;
  margin-left:12%; 
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

.btn-primary{
  margin-left: 110px;
  margin-top: 15%;
  width: 45%;
  background-color: #E30000;
  height: 45px;

}

.form-group2 {
  margin-top: 7%;
}

.form-group1{
  margin-top: 11%;
}

.lien{
  margin-left: 40px;
  margin-top: 10%;
  font-size: smaller;
}

</style>