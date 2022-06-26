<template>
<div v-if="etape2 === false">
   <h1 style="color:#E30000;">PRENEZ VOTRE CARTE D'IDENTITÉ</h1>
   <h2 style="color:#63634;">Inscrivez vos informations !</h2>

  <form v-if="enregistrementModel === false" class="row" @submit.prevent="validerInscription">

    <div class=" row">
      <div class="div-gauche col-md-5 offset-md-1">
        <div class="Prenom">
          <label for="InputPrenom">Prénom</label>
          <input type="Prenom" class="form-control" id="InputPrenom" placeholder="Entrer votre Prénom" v-model="userInfo.Prenom">
        </div>

        <div class="Nom">
           <label for="InputNom">Nom</label>
           <input type="Nom" class="form-control" id="InputNom" placeholder="Entrer votre Nom" v-model="userInfo.Nom">
        </div>

        <div class="Prenom2">
           <label for="InputDeuxiemePrenom">Deuxième Prénom (facultatif)</label>
           <input type="Prenom" class="form-control" id="InputPrenom" placeholder="Entrer votre Prenom" v-model="userInfo.Prenom2">
        </div>

        <div class="Sexe">
           <label for="InputSexe">Sexe</label>
           <select name="Sexe" id="Sexe" v-model="userInfo.Sexe">
              <option value=""> Faites votre choix</option>
              <option value="Homme">Homme</option>
              <option value="Femme"> Femme</option>
           </select>
        </div>

         <div class="Date">
          <label for="Date">Date de naissance</label>
            <input type="date" id="start" name="trip-start"
             value="2018-07-22"
             min="1900-01-01" max="2148-12-31"
             required v-model="userInfo.Date">
        </div>
      </div>
    

      <div class="div-droite col-md-5 ">
        <div class="Ville">
      <label for="InputVille">Ville de naissance</label>
      <input type="Ville" class="form-control" id="InputVille" placeholder="Entrez votre ville de naissance" required v-model="userInfo.Ville">
    </div>

     <div class="Adresse">
      <label for="InputAdressederesidence">Adresse de résidence</label>
      <input type="Adresse" class="form-control" id="InputAdressederesidence" placeholder="Entrez votre adresse de résidence" required v-model="userInfo.Adresse">
    </div>


   <div class="Postal">
    <label for="InputCodePostal">Code Postal</label>
    <input type="CodePostal" class="form-control" id="InputCodePostal" placeholder="Entrer votre Code Postal" required v-model="userInfo.CodePostal">
    </div>

   <div class="CNI">
      <label for="InputCNI">Entrez votre numéro CNI </label>
      <input type="CNI" class="form-control" id="InputCNI" placeholder="Entrer votre CNI" v-model="userInfo.CNI" required>
   </div>

   <div class="form-group10">
      <label for="InputPassword"> Modèle facial </label>
      <button @click="enregistrerModel" id="enregistrer-model" class="btn btn-outline-primary" v-if="modelEnregistre === false">Enregistrer son modèle facial</button>
      <p v-else>Votre modèl est enregistré</p>
   </div>
   </div>
   </div> 
    <button type="submit" class="btn btn-danger btn-lg " href="/Inscription" >Suivant</button>
    <p class="lien"> Vous avez déjà un compte ? <a href="/#/Connexion" style="color:#E30000;" >Connectez-vous </a> </p>

  </form>

  <enregistrement-model v-if="enregistrementModel === true"
    v-bind:user-informations="userInfo"
  ></enregistrement-model>
    
</div>
<div v-else>
  <inscription-2
    v-bind:user-informations="userInfo"
  ></inscription-2>
</div>
</template>

<script>

module.exports = {
  props:{
    userInfo : {
      type: Object,
      default: function () {
        return {
          Prenom: '',
          Nom: '',
          Prenom2: '',
          Ville: '',
          Adresse: '',
          CodePostal: '',
          CNI: '',
          Date: '',
          Sexe: ''
        }
      }
    },
    modelEnregistre: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      // userInfo : {
      //   Prenom : '',
      //   Nom : '',
      //   Prenom2 : '',
      //   Sexe : '',
      //   Date : '',
      //   Ville : '',
      //   Adresse : '',
      //   CodePostal : '',
      //   CNI : '',
      //   Password : '',
      //   Email: '',
      //   ConfirmPassword : ''
      // }
      enregistrementModel : false,
      etape2 : false,
    }
  },
  methods : {
    enregistrerModel(){
      console.log(this.userInfo)
      this.enregistrementModel = true;
    },
    validerInscription(){
      if(!this.modelEnregistre){
        alert('Veuillez enregistrer votre modèle facial');
      }
      else{
        this.etape2 = true;
      }
    }

  },
  components : {
    Inscription2,
    EnregistrementModel
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
   margin-top: -2%;
   font-size:medium;
}
.Nom{
   margin-top: 2%;
}
.Prenom2{
  margin-top: 2%;
}
.Sexe{
  margin-top: 5%;
}
.Date{
  margin-top: 5%;
}
.Ville{
}
.Adresse{
  margin-top: 2.5%;
}
.Postal{
  margin-top: 2.5%;
}
.CNI{
  margin-top: 3.5%;
}
.form-group10{
  margin-top: 3.5%;
}

/*
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
} */

.lien{
  margin-left: 610px;
  margin-top: 2%;
  font-family: "Gill Sans", sans-serif;
  font-size: smaller;
}

.btn-danger{
    width: 250px;
     margin-left: auto;
     margin-right: auto;
     margin-top: 5%;
}
</style>