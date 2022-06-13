<template>
  <div class="container">
         <ul class="checkout-bar">
            <li class="active"><a href="#get-started" data-toggle="tab">Informations Vote</a></li>
            <li class=""><a href="#about-you" data-toggle="tab">Candidats</a></li>
            <li class=""><a href="#looking-for" data-toggle="tab">Participants</a></li>
            <li class=""><a href="#">Validation</a></li>
        </ul>

        <div class="div-load-bar"></div>

        <div class="en-tete-suffrage" v-if="validation === true ">
            <h2>Suffrage :</h2>
        </div>

        <!--Div information nouveau suffrage-->
        <div class="row " v-if="etape === 1 || editerSuffrage === true">
            <div class="formulaireVote col-md-6 offset-md-3" >
                <form @submit.prevent="avancerEtape">
                    <div class="mb-3">
                        <label for="nameVoteInput" class="form-label">Nom du suffrage</label>
                        <input type="text" class="form-control" id="nameVoteInput" v-model="suffrage.nom" required>
                    </div>
                    <div class="mb-3">
                        <label for="descriptionVoteInput" class="form-label">Description</label>
                        <textarea id="descriptionVoteInput" class="form-control" v-model="suffrage.description" required></textarea>
                    </div>
                    <button type="submit" v-if="validation === false "  class="btn btn-primary col-md-6 offset-md-3">Suivant</button>
                    <button type="button" @click="enregistreModificationsSuffrage" v-if="validation === true "  class="btn btn-primary col-md-6 offset-md-3">Enregistrer</button>

                </form>
            </div>
        </div>

        <!--Affichage suffrage-->
        <div class="card col-md-8 offset-md-2 div-suffrage" v-if="validation === true && editerSuffrage === false">
            <div class="card-body col-md-8 offset-md-2">
                <h5 class="card-title">{{suffrage.nom}}</h5>
                <p class="card-text">{{suffrage.description}}</p>
                <button type="button" @click="modifierSuffrage" class="btn btn-dessous btn-primary">Modifier</button>
            </div>
        </div>


        <div class="en-tete-candidats" v-if="validation === true">
            <h2>Candidats :</h2>
        </div>

        <!--Div ajout de candidats-->
        <div class="row" v-if="etape === 2 || editCandidat === true || afficherFormulaireCandidat === true">
            <div class="formulaireVote col-md-6 offset-md-3" >
                <form @submit.prevent="candidatSupplementaire">
                    <div class="mb-3">
                        <label for="nomeCandidatInput" class="form-label">Nom du candidat</label>
                        <input type="text" class="form-control" id="nomeCandidatInput" v-model="ajoutCandidat.nom" required>
                    </div>
                    <div class="mb-3">
                        <label for="prenomCandidatInput" class="form-label">Prénom du candidat</label>
                        <input type="text" class="form-control" id="prenomCandidatInput" v-model="ajoutCandidat.prenom" required>
                    </div>
                    <div class="mb-3">
                        <label for="imageCandidatInput" class="form-label">Photo du candidat</label>
                        <input type="text" class="form-control" id="imageCandidatInput" v-model="ajoutCandidat.photo" required>
                    </div>
                    <div class="mb-3">
                        <label for="descriptionCandidatInput" class="form-label">Description</label>
                        <textarea id="descriptionCandidatInput" class="form-control" v-model="ajoutCandidat.description" required></textarea>
                    </div>
                    <div v-if="this.editCandidat === false && afficherFormulaireCandidat === false">
                        <div class="btn-form">
                            <button type="button" @click="passerEtape3"  class="btn btn-primary col-md-6 offset-md-3">Enregistrer et Suivant</button>                    
                            <button type="submit"  class="btn btn-outline-primary col-md-6 offset-md-3">Ajouter un Candidat</button>
                        </div>
                        <button type="button" @click="avancerEtape" class="btn btn-primary col-md-6 offset-md-3 btn-dessous">Suivant sans enregistrer</button>
                    </div>
                    <div v-if="this.editCandidat === true || afficherFormulaireCandidat === true">
                        <button type="button" @click="candidatSupplementaire" class="btn btn-primary col-md-6 offset-md-3 btn-dessous">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>

        <!--Affichage des candidat en cours d'ajout-->
        <div>
            <div class="grille-candidats" v-if="etape === 2 || validation === true">
                <div class="row row-cols-1 row-cols-md-3 g-4 center">
                    <div class="col" v-for="candidat in ajoutCandidats" :key="candidat.id">
                        <div class="card"  style="width: 16rem;">
                            <img :src="candidat.photo" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{candidat.nom}} - {{candidat.prenom}}</h5>
                                <p class="card-text">{{candidat.description}}</p>
                                <button type="button" @click="modifierCandidat(candidat)"  class="btn btn-primary">Modifier</button>
                                <button type="button" @click="supprimerCandidat(candidat)" class="btn btn-outline-primary">supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="liste-candidats">
                <button type="button" @click="ajouterCandidat" class="btn btn-dessous btn-primary" v-if="validation === true && afficherFormulaireCandidat === false">Ajouter Candidat</button>
            </div>
        </div>


        <div class="en-tete-votants" v-if="validation === true">
            <h2>Votants :</h2>
        </div>

        <!--Div ajout de votant-->
        <div class="row" v-if="etape === 3 || afficherFormulaireVotant === true">
            <div class="formulaireVote col-md-6 offset-md-3" >
                <form @submit.prevent="votantSupplementaire">
                    <div class="mb-3">
                        <label for="emailVotantInput" class="form-label">Email du votant</label>
                        <input type="text" class="form-control" id="emailVotantInput" v-model="ajoutParticipant" required>
                    </div>
                    
                    <div v-if="this.afficherFormulaireVotant === false">
                        <div class="btn-form">
                            <button type="button" @click="passerEtape4"  class="btn btn-primary col-md-6 offset-md-3">Enregistrer et Suivant</button>                    
                            <button type="submit"  class="btn btn-outline-primary col-md-6 offset-md-3">Ajouter un Votant</button>
                        </div>
                        <button type="button" @click="avancerEtape"  class="btn btn-primary col-md-6 offset-md-3 btn-dessous">Suivant sans enregistrer</button>
                    </div>
                    <div v-if="this.afficherFormulaireVotant === true">
                        <button type="button" @click="votantSupplementaire" class=" btn btn-primary col-md-6 offset-md-3 btn-dessous">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>

        <div  v-if="etape === 3 || validation === true" class="list-email-participants">
            <ul class="list-group ">
                <li class="list-group-item" v-for="participant in ajoutParticipants" :key="participant">{{participant}}  <button type="button" @click="supprimerParticipant(participant)" class="btn-close btn-email-participant" aria-label="Close"></button></li>
            </ul>
            <button type="button" @click="formulaireAjouterVotant" class="btn btn-dessous btn-primary" v-if="validation === true && afficherFormulaireVotant === false">Ajouter Votant</button>
        </div>

        <div class="btn-validation-suffrage">
            <button type="button" @click="validerSuffrage" class="btn btn-lg btn-dessous btn-primary" v-if="validation === true">Valider le suffrage</button>
        </div>
      
  </div>
</template>

<script>
module.exports = {
props:{

    },
    data(){

        return{
            suffrage:{
                nom:'',
                description:'',
                candidats:[],
                votants:[]
            },
            ajoutParticipant: '',
            ajoutParticipants: [],
            ajoutCandidats:[],
            ajoutCandidat :{
                nom:'',
                prenom:'',
                photo:'',
                description:'',
                progamme:''
            },
            etape: 1,
            editCandidat: false,
            editVotant: false,
            validation:false,
            afficherFormulaireVotant: false,
            afficherFormulaireCandidat: false,
            editerSuffrage: false
        }
    },
    methods:{
        validerSuffrage(){
            this.suffrage.candidats = this.ajoutCandidats;
            this.suffrage.votants = this.ajoutParticipants;
            this.avancerEtape()
            console.log(this.suffrage)
        },
        votantSupplementaire(){
            if(this.ajoutParticipant === ''){

            }else{
                this.ajoutParticipants.push(this.ajoutParticipant);
                this.ajoutParticipant= '';
            }
            this.editVotant = false;
            this.afficherFormulaireVotant = false;
        },
        ajouterCandidat(){
            console.log('ok')
            this.afficherFormulaireCandidat = true;
        },
        candidatSupplementaire(){
            if(this.ajoutCandidat.nom === ''){

            }else{
                this.ajoutCandidats.push(this.ajoutCandidat);
                this.ajoutCandidat = {
                    nom:'',
                    prenom:'',
                    photo:'',
                    progamme:'',
                };
            }
            this.editCandidat = false;
            this.afficherFormulaireCandidat =false;
        },
        enregistreModificationsSuffrage(){
            this.editerSuffrage = false;
        },
        passerEtape3(){
            this.candidatSupplementaire();
            this.avancerEtape();
        },
        passerEtape4(){
            this.votantSupplementaire()
            this.avancerEtape();
        },
        avancerEtape(){
            this.editCandidat = false;
            this.editVotant = false;
            this.afficherFormulaireVotant = false;
            if(this.etape < 3) {
                var listeUL = document.getElementsByClassName('checkout-bar')
                var curr = listeUL[0].getElementsByClassName('active')[0]
                listeUL[0].getElementsByClassName('active')[0].classList.add("visited")
                listeUL[0].getElementsByClassName('active')[0].classList.remove("active")
                curr.nextElementSibling.classList.add('active');
                this.etape ++;
            }else{
                if(this.etape == 3){
                    var listeUL = document.getElementsByClassName('checkout-bar')
                    var curr = listeUL[0].getElementsByClassName('active')[0]
                    listeUL[0].getElementsByClassName('active')[0].classList.add("visited")
                    listeUL[0].getElementsByClassName('active')[0].classList.remove("active")
                    curr.nextElementSibling.classList.add('active');
                    this.etape ++;
                    this.validation = true;
                }else{
                    var listeUL = document.getElementsByClassName('checkout-bar')
                    var curr = listeUL[0].getElementsByClassName('active')[0]
                    listeUL[0].getElementsByClassName('active')[0].classList.add("visited")
                    listeUL[0].getElementsByClassName('active')[0].classList.remove("active")

                }
            }
            console.log(this.etape)
        },
        modifierCandidat(candidat){
            this.editCandidat = true;
            this.ajoutCandidat = candidat;
            var index = this.ajoutCandidats.indexOf(candidat);
            this.ajoutCandidats.splice(index,1);
            this.editCandidat = true
        },
        supprimerCandidat(candidat){
            var index = this.ajoutCandidats.indexOf(candidat);
            this.ajoutCandidats.splice(index, 1);
        },
        supprimerParticipant(participant){
            var index = this.ajoutParticipants.indexOf(participant);
            this.ajoutParticipants.splice(index, 1);
        },
        formulaireAjouterVotant(){
            this.afficherFormulaireVotant = true;
        },
        modifierSuffrage(){
            this.editerSuffrage = true;
        }

    },
    async mounted(){
        console.log(this.listeCandidat)
    },
    components:{
        
    }
}
</script>

<style>

.checkout-wrap {
    font-family:'PT Sans Caption', sans-serif;
    margin: auto auto;
    z-index: 0;
}

.checkout-bar{

    margin-top: 50px!important;
    margin-bottom: 50px!important;
    margin-left: 5%!important;
    margin-right: 20%!important;
}
ul.checkout-bar li {
    color: #ccc;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    display: inline-block;
    margin: 50px auto;
    padding: 0;
    text-align: center;
    width: 22.5%;
}
ul.checkout-bar li:before {
    -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    background: #ddd;
    border: 2px solid #FFF;
    border-radius: 50%;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
    height: 34px;
    left: 40%;
    line-height: 34px;
    position: absolute;
    top: -60px;
    width: 34px;
    z-index: 99999;
}
ul.checkout-bar li.active {
    color: #A6447A;
    font-weight: bold;
}
ul.checkout-bar li.active:before {
    background: #A6447A;
}
ul.checkout-bar li.visited {
    color: #036c99;
    z-index: 99999;
    background: none;
}
ul.checkout-bar li.visited:before {
    background: #036c99;
    z-index: 99999;
}
ul.checkout-bar li:nth-child(1):before {
    content:"1";
}
ul.checkout-bar li:nth-child(2):before {
    content:"2";
}
ul.checkout-bar li:nth-child(3):before {
    content:"3";
}
ul.checkout-bar li:nth-child(4):before {
    content:"4";
}
ul.checkout-bar li:nth-child(5):before {
    content:"5";
}
ul.checkout-bar li:nth-child(6):before {
    content:"6";
}
ul.checkout-bar a {
    color: #ccc;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
}
ul.checkout-bar li.active a {
    color: #A6447A;
}
ul.checkout-bar li.visited a {
    color: #036c99;
}
.checkout-bar li.active:after {
    -webkit-animation: myanimation 3s 0;
    background-size: 35px 35px;
    background-color: #A6447A;
    background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    content:"";
    height: 15px;
    width: 50%;
    left: 50%;
    position: absolute;
    top: -50px;
    z-index: 0;
}
ul.checkout-bar {
    -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    background-size: 35px 35px;
    background-color: #EcEcEc;
    background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, transparent 75%, transparent);
    border-radius: 15px;
    height: 15px;
    margin: 0 -15px 0;
    padding: 0;
    position: absolute;
    width: 60%;
}
ul.checkout-bar:before {
    background-size: 35px 35px;
    background-color: #036c99;
    background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    content:" ";
    height: 15px;
    left: 0;
    position: absolute;
    width: 14%;
}
ul.checkout-bar li.visited:after {
    background-size: 35px 35px;
    background-color: #036c99;
    background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    content:"";
    height: 15px;
    left: 50%;
    position: absolute;
    top: -50px;
    width: 100%;
    z-index: 99;
}

.btn-form{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.btn-form > button{
    margin-left: 0!important;
    width: 40%;
}

.btn-dessous{
    
    margin-top: 40px;
    width: 90%;
    margin-left: 5%!important;
}

.btn-email-participant{
    float: right!important;
}

.list-email-participants, .liste-candidats{
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
}

.btn-validation-suffrage{
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 150px;
}
.div-load-bar{
    height: 200px;
}

.en-tete-votants, .en-tete-candidats, .en-tete-suffrage{
    width: 80%;
    border-bottom: solid 2px black;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
}

.div-suffrage{
    margin-top: 50px;
}
</style>