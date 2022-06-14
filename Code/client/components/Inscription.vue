<template>
  <form id="form-connexion">
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
    <input type="Email" class="form-control" id="InputEmail" placeholder="Entrer votre Email" autofocus="" required="">
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
<p class="lien"> Vous avez déjà un Compte ? <a href="/Connexion" style="color:#E30000;" >Connectez-vous </a> </p>
<div id="image-fond"></div>


  </form>
</template>

<style scoped>
 

#form-connexion {
  width:26%;
  margin-top:5%;
  margin-left:55%;

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
  margin-left: 95px;
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
  margin-left: 90px;
  margin-top: 5%;
  font-family: "Gill Sans", sans-serif;
  font-size: smaller;
}

input[type=checkbox] {
  width: 10px;
}
 
input[type=submit] {
  width: 150px;
  padding: 10px;
}

#image-fond {
height: 400px;
width: 300px;
margin-left: 100px;
margin-right: auto;
background-image:url("../assets/fond1.png");
}
</style>