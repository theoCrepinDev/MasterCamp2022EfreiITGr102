<template>
<div class="container">
    <div v-if="enregistrementModel === true">
        <div class="webcam">
        
            <div class="md-col-4 offset-md-4">
                <p>Veuillez prendre deux photos de votre visage avec des positions différentes.</p>
                <p>Assurez vous que les photos soient claires.</p>
                <h3>Votre webcam :</h3>
                <video id="webcam" autoplay playsinline width="640" height="480"></video>
                <canvas id="canvas" class="d-none"></canvas>
              </div>    
            </div>
        
        <div class="row" >
            <div class="photo1 col md-col-5 offset-md-2">
                <h2>Photo visage 1 :</h2>
                <button @click="choisirPhoto1" id="takePicture1Btn" class="btn btn-outline-primary">Prendre photo</button>
                <div class="card" style="width: 18rem;" >
                    <p id="picture1Div"></p>  
                </div>
            </div>
            <div class="photo2 col md-col-5">
                <h2>Photo visage 2 :</h2>
                <button @click="choisirPhoto2" id="takePicture2Btn" class="btn btn-outline-primary">Prendre photo</button>
                <div class="card" style="width: 18rem;">
                    <p id="picture2Div"></p>
                </div>  
            </div>
        </div>
        <button type="button" @click="validerModels" class="btn btn-outline-primary" id="validerModels">Valider</button>
    </div>

    <div v-else>
        <prise-photo
            v-bind:cni-user="userInformations.CNI"
            v-bind:etape-vote="false"
            v-bind:etape-enregistrement="true"
            v-bind:user-informations="userInformations"
        ></prise-photo>
    </div>
    
</div>
    
</template>

<script>
module.exports = {
    props:{
        userInformations: {type: Object},
    },
    data() {
        return {
            enregistrementModel: true,
            photo1: null,
            photo2: null,
        }
    },
    methods: {
        async validerModels(){
            console.log(this.userInformations)

            this.photo1 = document.getElementById('picture1Div').childNodes[0].src;
            this.photo2 = document.getElementById('picture2Div').childNodes[0].src;
            //Remplacer '11' par le numéron CNI du user
            await axios.post('/apiModel/model-upload/' + 1 + '/' + this.userInformations.CNI , {file : this.photo1})
            await axios.post('/apiModel/model-upload/' + 2 + '/' + this.userInformations.CNI , {file : this.photo2})
            this.enregistrementModel = false;
        }
    },
    mounted(){
      const webcamElement = document.getElementById('webcam');
      const canvasElement = document.getElementById('canvas');
      const snapSoundElement = document.getElementById('snapSound');
      const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
      webcam.start()
      .then(result =>{
      })
      .catch(err => {
        console.log(err);
      });

      let takePicture1Btn = document.getElementById('takePicture1Btn')
      console.log(takePicture1Btn)

      takePicture1Btn.addEventListener('click', takePicture1);

      let takePicture2Btn = document.getElementById('takePicture2Btn')
      console.log(takePicture2Btn)

      takePicture2Btn.addEventListener('click', takePicture2);

      let utiliserPhotoBtn = document.getElementById('validerModels')

      utiliserPhotoBtn.addEventListener('click', closeWebcam);

      function closeWebcam(){
        webcam.stop()
      }

      function takePicture1(){
          this.photo1 = webcam.snap();
          document.getElementById('picture1Div').innerHTML = 
            '<img src="' + this.photo1 +'"/>'

      }
      function takePicture2(){
          this.photo2 = webcam.snap();
          document.getElementById('picture2Div').innerHTML = 
            '<img src="' + this.photo2 +'"/>'

      }

    },
    components : {
        PrisePhoto
    }
    
}
</script>

<style scoped>
.row{
    margin-top: 60px;
}

.container{
    max-width: 100%!important;
}

.webcam {
    margin-top: 60px;
}
</style>