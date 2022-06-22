<template>
    <div id="reconnaissanceFaiciale" class="container center">
        <p>Vérification identité de <span id="CNIUserConnected">{{cniUser}}</span> pour valider le vote pour le candidat : <span id="IDCandidatChoisit">{{choixCandidat.ID_candidat}}</span></p>
        <p>Si vous n'êtes pas redirigé d'ici 20 secondes cela signifie que la photo est mal prise....</p>
        <p>Cliquer ici pour recommencer : <router-link to="/validationVoteIdentite"> ici </router-link></p>
        <img :src="photoPrise" id="imgPrise">
        <button type="button" @click="validerVote" style="display:none" id="btnValiderVote">Valider le vote</button>
    </div>
</template>

<script>

module.exports = {
    props:{
        reponseVoter: {type: Object},
        photoPrise: {type: String},
        userConnected: {type: Object},
        cniUser: {type: String},
        choixCandidat:{type: Object}

    },
    data(){
        return{
            dataTest:0
        }
    },
    async mounted(){
        console.log(this.choixCandidat)
        let recaptchaScript = document.createElement('script') 
        recaptchaScript.setAttribute('type', 'module')
        recaptchaScript.setAttribute('src', 'scriptReconnaissanceFaciale.js') 
        document.head.appendChild(recaptchaScript)

    },
    methods:{
        async validerVote(){
            const data = {
                votant: '1',
                candidat: this.choixCandidat
            }
            await axios.post("/api/voter/" + data.votant, data.candidat)
                .then(rep => {
                    console.log("then")
                    console.log(rep)
                })
                .catch(rep => {
                    console.log("catch")
                    console.log(rep)
                })
        }
    }
}

</script>
