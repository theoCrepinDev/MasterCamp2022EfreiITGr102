<template>
<div class="container row">

<div id="image-fond" class="col col-md-15"></div>
<div class="col col-md-5">

<form id="form-connexion" >
  <h1 style="color:#E30000;">INSCRIPTION</h1>
  <h2 style="color:#63634;">Inscrivez vos informations !</h2>


   <div class="form-group1">
    <label for="InputPrenom">Prénom</label>
    <input type="Prenom" class="form-control" id="InputPrenom" placeholder="Entrer votre Prénom" autofocus="" required="">
  </div>

  <div class="form-group2">
    <label for="InputNom">Nom</label>
    <input type="Nom" class="form-control " id="InputNom" aria-describedby="Nom" placeholder="Entrer votre Nom" autofocus="" required="">
  </div>

   <div class="form-group3">
    <label for="InputEmail">Email</label>
    <input type="Email" class="form-control" id="InputEmail" placeholder="Entrer votre Email" pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
    required>
  </div>

   <div class="form-group3">
      <label for="InputPassword">Mot de passe</label>
      <input type="password" class="form-control" id="InputPassword" placeholder="*********" required="">
   </div>

   <div class="form-group3">
      <label for="InputPassword">Confirmer votre Mots de passe </label>
      <input type="password" class="form-control" id="InputPassword" placeholder="*********" autofocus="" required="">
   </div>

<button type="button" class="btn btn-danger btn-lg btn-block">Inscription</button>
<p class="lien"> Vous avez déjà un compte ? <a href="/Connexion" style="color:#E30000;" >Connectez-vous </a> </p>


  </form>

</div>
</div>
  
</template>

<style scoped>
 

#form-connexion {
  /*width:26%;
  margin-top:5%;
  margin-left:55%;*/

}


h1 {
  text-align: center;
  font-size:40px;
  line-height:87px;
 
}

h2 {
  color:#636364;
  text-align:center;
  font-size: 19px;
  line-height: 39px;
   margin-top: -5%;
   font-size: smaller;
}

.btn-danger{
  margin-left: 70px;
  margin-top: 5%;
  width: 60%;

}

.form-group2 {
  margin-top: 5%;
}

.form-group3{
  margin-top: 5%;
}
.form-group4{
  margin-top: 5%;
}
.form-group5{
  margin-top: 5%;
}
.lien{
  margin-left: 50px;
  margin-top: 5%;
  font-family: "Gill Sans", sans-serif;
  font-size: smaller;
}


#image-fond {
height: 750px;
margin-left: -25px;
margin-right: auto;
max-width: 900%;

background-image:url("../assets/vote.png");
background-color: rgba(234, 234, 234, 1);
}
</style>