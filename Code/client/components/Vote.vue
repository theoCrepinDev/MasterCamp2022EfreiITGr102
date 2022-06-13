<template>
<div>
    <div class="titre-grille-candidats" >
        <h3>Candidats :</h3>

        <form class="d-flex" role="search">
            <input class="form-control me-2 search-candidat" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-dark" type="submit"  id="img-loupe"><img src="../images/Vectorloupe.png"></button>
        </form>
    </div>

    <div class="grille-candidats">
        <div class="row row-cols-1 row-cols-md-3 g-4 center">
            <div class="col" v-for="candidat in listeCandidat" :key="candidat.id">
                <div class="card"  style="width: 24rem;">
                    <img :src="candidat.photo" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{candidat.nom}} - {{candidat.prenom}}</h5>
                        <p class="card-text">{{candidat.description}}</p>
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
            test : 'data test'
        }
    },
    methods:{

    },
    async mounted(){
        console.log(this.listeCandidat)
    },
    components:{
        
    }

}
</script>

<style>

</style>