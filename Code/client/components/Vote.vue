<template>
<div v-if="voterPossible === true">
<div v-if="verification === false">
    <div class="titre-presentation-suffrage ">
        <h2>Suffrage :</h2>
    </div>

    <div class="presentation-suffrage">
        <h1>{{SuffrageAffiche.nom_suffrage}}</h1>
        <h3>{{SuffrageAffiche.description_suffrage}}</h3>
        
        <br/>
        <h3>Date de fin : {{SuffrageAffiche.date_fin_suffrage.split('T')[0]}}</h3>
        <h3>Heure de fin : {{SuffrageAffiche.heure_fin_suffrage}}</h3>
        <br/>
        <h4>Nombre de participants : {{SuffrageAffiche.nombre_Votants}}</h4>
    </div>

    <div class="titre-grille-candidats" >
        
        <h2>Candidats :</h2>

        <form class="d-flex" role="search" @submit.prevent="search">
            <input class="form-control me-2 search-candidat" type="search" placeholder="Search" aria-label="Search" v-model="query">
            <button class="btn btn-outline-dark" type="submit"  id="img-loupe"><img src="../images/Vectorloupe.png"></button>
        </form>
    </div>


    

    <div class="grille-candidats">
        <div class="row row-cols-1 row-cols-md-3 g-4 center">
            <div class="col" v-for="candidat in SuffrageAffiche.candidats" :key="candidat.id">
                <div class="card"  style="width: 24rem;">
                    <img :src="candidat.Photo_candidat" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{candidat.Nom_candidat}} - {{candidat.Prénom_candidat}}</h5>
                        <p class="card-text">{{candidat.Description_candidat}}</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#validerVote"  @click="choixCandidat(candidat)">
                            Voter !
                        </button>
                        <a :href="candidat.Programme_candidat" class="btn btn-outline-primary">Plus d'info</a>
                    </div>
                </div>
            

                <!-- Modal -->
                <div class="modal fade" id="validerVote" tabindex="-1" role="dialog" aria-labelledby="validerVoteLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="validerVoteLabel" >Validation vote</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Voulez-vous valider votre vote pour {{candidat.Nom_candidat}} {{candidat.Prénom_candidat}}
                                <br/>
                                Cliquer sur "Voter" pour lancer la Reconnaissance Faciale
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="voter(candidat)">Voter !</button>
                            </div>  
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
<div v-else>
    <prise-photo 
        v-bind:choix-candidat="candidatChoisit"
        v-bind:cni-user="userConnected.CNI"
        v-bind:etape-vote="true"
        v-bind:etape-enregistrement="false"
    ></prise-photo>
</div>
</div>
<error v-else 
    text-page="Vous ne pouvez plus voter pour ce suffrage ..."
></error>
</template>

<script>
module.exports =  {
     props:{
        listeCandidat: {type : Array, default: []},
        reponseVoter: {type: Object},
        userConnected: {type: Object}
        
    },
    data(){

        return{
            Suffrage:[],
            SuffrageAffiche: {},
            verification : false,
            candidatChoisit: null,
            voterPossible : false,
            candidatBruts : [],
            query: ''
        }
    },
    methods:{
        search(){
            this.SuffrageAffiche.candidats = this.candidatBruts.filter(candidat => {
                return candidat.Nom_candidat.toLowerCase().includes(this.query.toLowerCase()) || candidat.Prénom_candidat.toLowerCase().includes(this.query.toLowerCase());
            });
        },
        async voter(candidat){
            this.verification = true
        },
        choixCandidat(data){
            this.candidatChoisit = data
        },
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

    },
    async mounted(){
        await axios.get('/api/suffrage/heureFin')
            .then(rep => {
                const date = rep.data[0].Date_fin_suffrage.split('T')[0]
                const dateFin = new Date(date + ' ' + rep.data[0].Heure_fin_suffrage)
                dateFin.setDate(dateFin.getDate() + 1)
                const dateNow = new Date()
                console.log(dateFin)
                console.log(dateNow)
                if(dateNow < dateFin){
                    this.voterPossible = true;
                }
            })

        await axios.get('/api/suffrage/email1', {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                this.SuffrageAffiche = res.data;
                this.candidatBruts = res.data.candidats;
            })
            .catch(res => {
                this.$router.push('/Error/' + 'Veuillez vous identifier ....') 
            })
    },
    components:{
        PrisePhoto,
        Error
    }

}
</script>

<style>
.titre-presentation-suffrage, .titre-grille-candidats{
    width: 80%;
    border-bottom: solid 2px black;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
}

.row ,.row-cols-1, .row-cols-md-3 , .g-4{
    justify-content: space-between;    
}


.grille-candidats{
    margin-top: 30px;
    width:70%;
    margin-left: 15%;
}

.titre-grille-candidats{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-bottom: 10px ;
}

.search-candidat{
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: 0!important;
}

#img-loupe{
    border: 1px solid #ced4da;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.presentation-suffrage{
    margin-left: 15%;
    
    margin-top: 30px;
    width:70%;
}

.presentation-suffrage > h1 {
    font-family: Poppins;
    font-size: 52px;
    font-weight: 600;
    line-height: 78px;
    letter-spacing: 0em;
    text-align: left;
}


.presentation-suffrage > h3{
    font-family: Poppins;
    font-size: 26px;
    font-weight: 500;
    line-height: 39px;
    letter-spacing: 0.03em;
    text-align: left;
    text-indent: 2em;
}

.presentation-suffrage > h4{
    font-family: Poppins;
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: left;
    color: #C4C4C4;
}

</style>