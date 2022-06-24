<template>
<div id="container">
    <div class="titre-grille-candidats" >
        
        <h2>Majorité : {{this.major}} </h2>

        <form class="d-flex" role="search">
            <input class="form-control me-2 search-candidat" type="search" placeholder="Rechercher un candidat" aria-label="Search">
            <button class="btn btn-outline-dark" type="submit"  id="img-loupe"><img src="../images/Vectorloupe.png"></button>
        </form>
    </div>
    <div style="text-align: center;">
        <svg viewBox="0 0 36 36" class="circle-svg" style="display: inline-block; margin-left: -3%">
  
            <path class="around" stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
  
            <path class="percent" v-bind:stroke-dasharray="this.cand1+','+this.full" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
  
            <text x="18" y="14" text-anchor="middle" dy="7" font-size="20">1st</text>
  
        </svg>
        
        <svg viewBox="0 0 36 36" class="circle-svg" style="display: inline-block; width:680px; ">
  
            <path class="around" stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
  
            <path class="percent" v-bind:stroke-dasharray="this.cand2+','+this.full" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
  
            <text x="18" y="14" text-anchor="middle" dy="7" font-size="20">2nd</text>
  
        </svg>
        <svg viewBox="0 0 36 36" class="circle-svg" style="display: inline-block; margin-left: -3%;" >
  
            <path class="around" stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
  
            <path class="percent" v-bind:stroke-dasharray="this.cand3+','+this.full" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
  
            <text x="18" y="14" text-anchor="middle" dy="7" font-size="20">3th</text>
  
        </svg>
         <div class="container" >
            <div  v-for="candidat in CandidatAffiche.candidats" :key="candidat.nombre_Votants">
                <div class="card">
                    <img :src="candidat.Photo_candidat" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{candidat.Nom_candidat}} {{candidat.Prénom_candidat}}</h5>
                        <p class="card-text">{{candidat.Description_candidat}}</p>
                        
                        <a :href="candidat.Programme_candidat" class="btn btn-outline-primary">Programme</a>
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
        listeCandidat: {type : Array, default: []},
        reponseVoter: {type: Object},
        userConnected: {type: Object}
        
    },
    data(){

        return{
            Suffrage:[],
            SuffrageAffiche: {},
            CandidatAffiche: {},
            candidatChoisit: null,
            major: null,
            summ: 0,
            cand1: 0,
            cand2: 0,
            cand3: 0,
            max: 0,
            full: 100
        }
    },
    async mounted(){
        this.SuffrageAffiche = (await axios.get('/api/suffrage/1')).data;
        console.log(this.SuffrageAffiche)
        this.cand1 = Object.values(JSON.parse(JSON.stringify(this.SuffrageAffiche.nombre_Votants[0]))) ;
        this.cand2 = Object.values(JSON.parse(JSON.stringify(this.SuffrageAffiche.nombre_Votants[1])));
        this.cand3 = Object.values(JSON.parse(JSON.stringify(this.SuffrageAffiche.nombre_Votants[2])));
        this.summ = parseInt(this.cand1) + parseInt(this.cand2) + parseInt(this.cand3);
        this.cand1 = ( parseInt(this.cand1) / parseInt(this.summ) ) * 100;
        this.cand2 = ( parseInt(this.cand2) / parseInt(this.summ) ) * 100;
        this.cand3 = ( parseInt(this.cand3) / parseInt(this.summ) ) * 100;
        this.max = Math.max(this.cand1, this.cand2, this.cand3);
        this.CandidatAffiche = (await axios.get('/api/candidat/1')).data;
        this.major = this.CandidatAffiche.Nom_candidat+ ' ' +this.CandidatAffiche.Prénom_candidat;
        
    },
   
}
</script>


<style>

#container {
    height: auto;
    margin: 0 auto;
    padding: 10px;
    position: relative;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}
.circle-svg {
  display: block;
  margin: 10px auto;
  max-height: 100px;
  margin-top: 6%;
  
}
.circle-svg text {
  text-align:center;
  color:black;
  font-size:10px
}
.circle-svg path.percent {
  stroke: #008000;
  fill: none;
  stroke-width: 1.4;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}
.circle-svg path.around {
    stroke: #c4c4c4;
    fill: none;
    stroke-width: 0.8;
}
body {
  text-align:center;
}



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
    width:30%;
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


.container {
  display: block;
  width: 100%;
    text-align: center;
    margin-bottom: 6%;

}

.card {
  border: 1px solid black;
  float:left;
  margin-left: 10%;
  margin-top: 6%;
  /*setting width for each and every card element as well as -10px for removing the margin width for 5 elements*/
  width: calc( 100% / 5 - 10px);
  
}

.card-img-top {
    width: 100%;
    height: 22vw;
    object-fit: cover;
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


<!-- <template>
  <div>
    <ejs-button @click.native="addChart">Add Chart</ejs-button>
  </div>
</template>

<script>
import Vue from 'vue';
import { ButtonPlugin } from '@syncfusion/ej2-vue-buttons';
import { Chart } from "@syncfusion/ej2-charts";
import { ChartPlugin, LineSeries, Category, Selection, Series, Tooltip } from "@syncfusion/ej2-vue-charts";
Chart.Inject(LineSeries);

Vue.use(ChartPlugin);
Vue.use(ButtonPlugin);
var count = 1;
export default {
  data () {
    return {
      seriesData: [
        { x: 1, y: 21 }, { x: 2, y: 24 },
        { x: 3, y: 36 }, { x: 4, y: 38 },
        { x: 5, y: 54 }, { x: 6, y: 57 },
        { x: 7, y: 70 }
      ],
      title: "Inflation - Consumer Price"
    }
  },
  provide: {
    chart: [LineSeries]
  },
  methods: {
    addChart: function(e) {
      var chartEle = document.createElement('div');
      chartEle.id = 'container' + count;
      document.getElementsByTagName('body')[0].appendChild(chartEle);

      let chart = new Chart({
          series: [{
              type: 'Line', xName: 'x', width: 2, marker: { visible: true },
              yName: 'y', name: 'Germany',
              dataSource: [{ x: 1, y: 21 },{ x: 2, y: 24 },{ x: 3, y: 36 },
                      { x: 4, y: 38 },{ x: 5, y: 54 },{ x: 6, y: 57 },{ x: 7, y: 70 }],
              }],
          title: 'Inflation - Consumer Price', tooltip: { enable: true }, height:'400', width: '800'
      });
      chart.appendTo('#' + chartEle.id);
      count++;
    }
  }
}
</script>

<style>
  @import '../node_modules/@syncfusion/ej2-base/styles/material.css';
  @import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
</style> -->



