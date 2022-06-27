<template>
    <div>
        <div v-if="reconnaissanceEnCours === true">
            <div id="reconnaissanceFaiciale" class="container center">
        
            <p v-if="etapeVote === true">Vérification identité de <span id="CNIUserConnected">{{cniUser}}</span> pour valider le vote pour le candidat : <span id="IDCandidatChoisit">{{choixCandidat.ID_candidat}}</span></p>
            <p v-else>Vérification identité de <span id="CNIUserConnected">{{cniUser}}</span> pour valider l'inscription</p>
            <p>Si vous n'êtes pas redirigé d'ici 20 secondes cela signifie que la photo est mal prise....</p>
            <p>Cliquer ici pour recommencer : <button type="button" onclick="location.reload()"> ici </button></p>
            <p>Si votre identité est confirmée, un bouton 'Valider le vote' apparaitera.</p>
            <div id="photo-btn">        
                <img :src="photoPrise" id="imgPrise">
                <button type="button" @click="validerVote" class="btn btn-outline-primary" style="display:none" id="btnValiderVote" v-if="etapeVote === true">Valider le vote</button>
                <button type="button" @click="validerInscription" class="btn btn-outline-primary" style="display:none" id="btnValiderVote" v-if="etapeEnregistrement === true">Valider l'inscription</button>
            </div>
            </div>

        </div>
        <div v-else>
            <inscription-1 
            v-bind:user-info="userInformations"
            v-bind:model-enregistre="true"
            ></inscription-1>
        </div>
    </div>

    

    
</template>

<script>

module.exports = {
    props:{
        reponseVoter: {type: Object},
        photoPrise: {type: String},
        userConnected: {type: Object},
        cniUser: {type: String},
        choixCandidat:{type: Object},
        etapeVote: {type: Boolean},
        etapeEnregistrement: {type: Boolean},
        userInformations: {type: Object},


    },
    data(){
        return{
            dataTest:0,
            reconnaissanceEnCours : true,
        }
    },
    async mounted(){
        console.log(this.userInformations)
        let recaptchaScript = document.createElement('script') 
        recaptchaScript.setAttribute('type', 'module')
        recaptchaScript.setAttribute('src', 'scriptReconnaissanceFaciale.js') 
        document.head.appendChild(recaptchaScript)

    },
    methods:{
        async validerVote(){
            const data = {
                votant: this.cniUser,
                candidat: this.choixCandidat
            }
            await axios.post("/api/voter/" + data.votant, data.candidat)
                .then(rep => {
                    switch (rep.data.code) {
                        case 2:
                            alert('Vous avez déjà voté pour ce suffrage ...')
                            this.$router.push('/')
                            break;
                        case 0:
                            alert('Vote pris en compte !')
                            this.$router.push('/')
                            break;
                        default:
                            alert("Une erreure innatendu s'est produite.... Contactez un administrateur.")
                            break;
                    }
                })
                .catch(rep => {
                    console.log(rep)
                    this.$router.push('/')
                })
        },
        validerInscription() {
            console.log('Envoit des infos user')
            console.log(this.userInformations)
            this.reconnaissanceEnCours = false;
        }
    },
    components : {
        Inscription1
    }
}

</script>

<style scoped>
#photo-btn{
    display: flex;
    flex-direction: column;
}

#photo-btn > button{
    margin-top: 50px;
}
</style>
