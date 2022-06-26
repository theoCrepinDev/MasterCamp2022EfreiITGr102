<template>
    <div class="row" >
        <div id="image-fond" style="height : 80vh"></div>
         <p class="text-center">{{textPage}}</p>
         <a class="btn btn-primary btn-block btn-lg col-md-2 offset-md-5" href='/' role="button"> Retour au menu </a>
    </div>
    
</template>

<script>
module.exports = {
    props:{
        textPage : {type: String, default: 'Page inconnue ...'},
    }

}
</script>


<style scoped>
#image-fond {
height: 350px!important;
width: 450px!important;
margin-left: auto;
margin-right: auto;
background-image:url("../assets/fond1.png");
}

.button {
    margin-left: 615px;
    margin-right: auto;
}

</style>