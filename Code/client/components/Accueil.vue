<template>
   <div class="row Acceuil">
    <div class="partieGaucheAccueil container col-md-5 offset-md-1">
        <h1 id="titrePartieGauche">Centralisez vos votes et prenez une décision en quelque secondes</h1>
        <p id="sousTitrePartieGauche">L’avis de chacun compte</p>
        <br/>
        <p id="textPresentationPArtieGauche">
            Besoin de prendre une décision en entreprise ou simplement entre particuliers ? 
            <br/><br/>
            Créez un compte YesWeVote et exprimez vous en votant à distance.
        </p>
        <div class="btnPartieGauche" v-if="userConnected.CNI === ''">
            <button type="button" class="btn-secondary btn btn-lg btn-block" onclick="location.href='/#/Connexion'">Connexion</button>
            <button type="button" class="btn-secondary btn btn-lg btn-block" onclick="location.href='/#/Inscription1'">Inscription</button>
        </div>
        <div v-else-if="userConnected.admin">
            <button type="button" class="btn-secondary btn btn-lg btn-block" aria-current="page" onclick="location.href='/#/AjouterVote'">Ajouter Vote</button>
        </div>
    </div>

    <div class="partieDroiteAccueil container col-md-5 ">
        <img src="../images/image_accueil.png" class="col-md-12" alt="Vote YesWeVote">
    </div>
   </div>
</template>

<script>
module.exports = {
    props:{
        userConnected: {
            type: Object,
            required: true
        }
    },
    data(){

        return{
            test : 'data test'
        }
    },
    methods:{

    },
    components:{
        
    }
}

</script>

<style scoped>
.Acceuil{
    margin-top: 100px;
    width: 95%;
}

#titrePartieGauche{
    font-family: Poppins;
    font-size: 52px;
    font-weight: 600;
    line-height: 78px;
    letter-spacing: 0em;
    text-align: left;

}

#sousTitrePartieGauche{
    font-family: Poppins;
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: left;
    color: #C4C4C4;

}

#textPresentationPArtieGauche{
    font-family: Poppins;
    font-size: 26px;
    font-weight: 500;
    line-height: 39px;
    letter-spacing: 0.03em;
    text-align: left;
}

.btnPartieGauche{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 100px;
}

.btnPartieGauche > button{
    width: 30%;
    height: 60px;
    background-color: #EBEBEB;
    color: black;
}
</style>