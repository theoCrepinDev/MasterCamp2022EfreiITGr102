<template>
    <div id="countdown">
    <strong id="titre">Compte à rebours avant les résultats</strong>
    <nav id="countdown-1">
        <span id="countdown_hour">--</span> :
        <span id="countdown_min" >--</span> :
        <span id="countdown_sec" >--</span> 
    </nav>
    <nav id="countdown-2">
        <p>HEURES</p>
        <p>MINUTES</p>
        <p>SECONDES</p>
    </nav>
    <div class="btnPartieGauche">
            <button type="submit" class="btn-secondary btn btn-lg btn-block" href="/#/vote" aria-current="page"><a class="nav-link active" href="/#/vote" aria-current="page">Retour au menu</a></button>
    </div>
    </div>

</template>


<script>
module.exports =  {
async mounted(){
    if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else
      localStorage.removeItem('firstLoad');
  }
}}
    countdownManager = {
    // Configuration
    
    targetTime: new Date('2022-11-05 00:00:00'), // Date cible du compte à rebours (00:00:00)
    displayElement: { // Elements HTML où sont affichés les informations
    
        hour: null,
        min:  null,
        sec:  null
    },
     
    // Initialisation du compte à rebours (à appeler 1 fois au chargement de la page)
    init:async function(){
        // Récupération des références vers les éléments pour l'affichage
        // La référence n'est récupérée qu'une seule fois à l'initialisation pour optimiser les performances
        this.displayElement.hour = jQuery('#countdown_hour');
        this.displayElement.min  = jQuery('#countdown_min');
        this.displayElement.sec  = jQuery('#countdown_sec');
        await axios.get('/api/suffrage/heureFin')
            .then(response => {
                this.targetTime = new Date(response.data[0].Date_fin_suffrage.split('T')[0] + ' ' + response.data[0].Heure_fin_suffrage);
                this.targetTime.setHours(this.targetTime.getHours());
                this.targetTime.setDate(this.targetTime.getDate() + 1);
            })
        // this.displayElement.targetTime = res.data.Heure_fin_suffrage

         
        // Lancement du compte à rebours
        this.tick(); // Premier tick tout de suite
        window.setInterval("countdownManager.tick();", 1000); // Ticks suivant, répété toutes les secondes (1000 ms)
    },
     
    // Met à jour le compte à rebours (tic d'horloge)
    tick: function(){
        // Instant présent
        var timeNow  = new Date(Date.now());
         
        // On s'assure que le temps restant ne soit jamais négatif (ce qui est le cas dans le futur de targetTime)
        if( timeNow >= this.targetTime ){
            
        }
         
        // Calcul du temps restant
        if (timeNow < this.targetTime) {
            
            var diff = this.dateDiff(timeNow, this.targetTime);
            
            this.displayElement.hour.text( diff.hour );
            this.displayElement.min.text(  diff.min  );
            this.displayElement.sec.text(  diff.sec  );
        }
         
    },
     
    
    dateDiff: function(date1, date2){
        
        var diff = {}                           
        var tmp = date2 - date1;
 
        tmp = Math.floor(tmp/1000);             
        diff.sec = tmp % 60;                    
        tmp = Math.floor((tmp-diff.sec)/60);    
        diff.min = tmp % 60;                    
        tmp = Math.floor((tmp-diff.min)/60);    
        diff.hour = tmp % 24;                   
        tmp = Math.floor((tmp-diff.hour)/24);   
        diff.day = tmp;
 
        return diff;
        
    }
};
 
jQuery(function($){
    // Lancement du compte à rebours au chargement de la page
    countdownManager.init();
});
</script>

<style scoped>
#titre{
    
    margin-top: 167px;
    margin-left: 50px;
}
#countdown{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 55px;
    font-family: Poppins;
    font-style: Bold;
    font-size: 50px;
    line-height: 100%;
    margin: Left;
    vertical-align: Top;
    letter-spacing: 3%;
        text-align: center;
}
#countdown-1{
    width: 100%;
    margin-right: auto;
    margin-top: 100px;
    font-family: Poppins;
    font-style: Bold;
    font-size: 70px;
    line-height: 100%;
    margin: Left;
    vertical-align: Top;
    letter-spacing: 3%;
    color: #E30000;
    text-align: center;
}
#countdown-2{
    display: inline-flex;
    justify-content: space-between;
    margin-right: auto;
    margin-top: 3%;
    width: 23%;
    font-family: Poppins;
    font-style: Bold;
    font-size: 10px;
    line-height: 100%;
    margin: Left;
    vertical-align: Top;
    letter-spacing: 3%;
    text-align: center;
}
.btnPartieGauche{
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    margin-right: auto;
    margin-top: 55px;
    font-family: Poppins;
    font-style: Bold;
    font-size: 50px;
    line-height: 100%;
    margin: Left;
    vertical-align: Top;
    letter-spacing: 3%;
    border-radius: 7cm;
    text-align: center;
}
.btnPartieGauche > button{
    width: 30%;
    height: 60px;
    background-color: #E30000;
    color: #fff;
}
</style>

