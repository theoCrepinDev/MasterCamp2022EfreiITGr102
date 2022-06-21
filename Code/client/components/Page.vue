<template>
<div >
   <h1 style="color:#E30000;">PRENEZ VOTRE CARTE D'IDENTITÉ</h1>
   <h2 style="color:#63634;">Inscrivez vos informations !</h2>

  <form>

    <div class="container row">
      <div class="div-gauche ">
        <div class="Prenom">
          <label for="InputPrenom">Prénom</label>
          <input type="Prenom" class="form-control" id="InputPrenom" placeholder="Entrer votre Prénom">
        </div>

        <div class="Nom">
           <label for="InputNom">Nom</label>
           <input type="Nom" class="form-control" id="InputNom" placeholder="Entrer votre Nom">
        </div>

        <div class="Prenom2">
           <label for="InputDeuxiemePrenom">Deuxième Prénom (facultatif)</label>
           <input type="Prenom" class="form-control" id="InputPrenom" placeholder="Entrer votre Prenom">
        </div>

        <div class="Sexe">
           <label for="InputSexe">Sexe</label>
           <select name="Sexe" id="Sexe">
              <option value=""> Faites votre choix</option>
              <option value="Homme">Homme</option>
              <option value="Femme"> Femme</option>
           </select>
        </div>

         <div class="Date">
          <label for="Date">Date de naissance</label>
            <input type="date" id="start" name="trip-start"
             value="2018-07-22"
             min="1900-01-01" max="2148-12-31">
        </div>
      </div>
    

      <div class="div-droite md-5">
        <div class="Ville">
      <label for="InputVille">Ville de naissance</label>
      <input type="Ville" class="form-control" id="InputVille" placeholder="Entrez votre ville de naissance">
    </div>

     <div class="Adresse">
      <label for="InputAdressederesidence">Adresse de résidence</label>
      <input type="Adresse" class="form-control" id="InputAdressederesidence" placeholder="Entrez votre adresse de résidence">
    </div>


   <div class="Postal">
    <label for="InputCodePostal">Code Postal</label>
    <input type="CodePostal" class="form-control" id="InputCodePostal" placeholder="Entrer votre Code Postal">
    </div>

   <div class="CNI">
      <label for="InputCNI">Entrez votre numéro CNI </label>
      <input type="CNI" class="form-control" id="InputCNI" placeholder="Entrer votre CNI">
   </div>

   <div class="form-group10">
      <label for="InputPassword">Confirmer votre Mots de passe </label>
      <input type="password" class="form-control" id="InputPassword" placeholder="*********">
   </div>
   </div>
   </div> 
  <button type="button" class="btn btn-danger btn-lg " href="/Inscription" >Suivant</button>
  <p class="lien"> Vous avez déjà un compte ? <a href="/Connexion" style="color:#E30000;" >Connectez-vous </a> </p>

  </form>
    
</div>
</template>

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
   margin-top: -2%;
   font-size:medium;
}
.Prenom{
    width: 45%;
}
.Nom{
   margin-top: 2%;
    width: 45%;
}
.Prenom2{
  margin-top: 2%;
   width: 45%;
}
.Sexe{
  margin-top: 5%;
   width: 45%;
}
.Date{
  margin-top: 5%;
   width: 45%;
}
.Ville{
   width: 60%;
}
.Adresse{
  margin-top: 2.5%;
   width: 60%;
}
.Postal{
  margin-top: 2.5%;
  width: 60%;
}
.CNI{
  margin-top: 3.5%;
  width: 60%;
}
.form-group10{
  margin-top: 3.5%;
  width: 60%;
}


.div-gauche{
  max-width: 70%;
  margin-left: 200px;
  margin-top: 2%;
}

.div-droite{
  margin-left: 760px;
max-width: 50%;
margin-top: -28.3%;
}

.container .div-droite .form-group1{
margin-top: 0%;
}

.lien{
  margin-left: 610px;
  margin-top: 2%;
  font-family: "Gill Sans", sans-serif;
  font-size: smaller;
}

.btn-danger{
    width: 250px;
     margin-left: 600px;
     margin-top: 5%;
}
</style>