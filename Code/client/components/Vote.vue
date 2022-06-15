<template>
<div>
    <div class="titre-presentation-suffrage ">
        <h2>Suffrage :</h2>
    </div>

    <div class="presentation-suffrage">
        <h1>{{SuffrageAffiche.nom_suffrage}}</h1>
        <h3>{{SuffrageAffiche.description_suffrage}}</h3>
        <br/>
        <h4>Nombre de participants : {{SuffrageAffiche.nombre_Votants}}</h4>
    </div>

    <div class="titre-grille-candidats" >
        
        <h2>Candidats :</h2>

        <form class="d-flex" role="search">
            <input class="form-control me-2 search-candidat" type="search" placeholder="Search" aria-label="Search">
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
                        <a href="#" class="btn btn-primary">Voter</a>
                        <a href="#" class="btn btn-outline-primary">Plus d'info</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports =  {
     props:{
        listeCandidat: {type : Array, default: []}
    },
    data(){

        return{
            test : 'data test',
            Suffrage:[],
            SuffrageAffiche: {}
        }
    },
    methods:{

    },
    async mounted(){
        //console.log(this.listeCandidat)
        //const res = await axios.get('/api/suffrage');
        //this.Suffrage = res.data;
        //console.log(this.Suffrage)
        this.SuffrageAffiche = (await axios.get('/api/suffrage/email1')).data;
        console.log(this.SuffrageAffiche)
    },
    components:{
        
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