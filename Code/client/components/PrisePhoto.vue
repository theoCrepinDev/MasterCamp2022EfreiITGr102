<template>
  <div id="app">
      <div v-if="prisePhoto === true" class="container">
        <div>
          <p>Veuillez autoriser le site à accéder à votre webcam.</p>
          <p>Regardez votre webcam dans une pièce éclairée et prenez une photo en cliqunt sur 'take a picture' lorsque l'image est nette.</p>
        </div>

        <div class="webcam">
          <div>
            <h3>Votre webcam :</h3>
            <video id="webcam" autoplay playsinline width="640" height="480"></video>
            <canvas id="canvas" class="d-none"></canvas>
            <audio id="snapSound" src="audio/snap.wav" preload = "auto"></audio>
          </div>
          <div>
            <button id="takePictureBtn" class="btn btn-outline-primary">Take picture</button>
            <button @click="lancerReconnaissance" class="btn btn-outline-primary" id="utiliserPhotoBtn">Utiliser cette photo</button>
          </div>
        </div>
        <div class="photo">
          <h3>Photo prise :</h3>
          <p id="pictureDiv">
          </p>
        </div>
      </div>

      <div v-else>
        <reconaissance-faciale 
          v-bind:choix-candidat="choixCandidat"
          v-bind:photo-prise="picture"
          v-bind:cni-user="cniUser"
        ></reconaissance-faciale>
      </div>
    
    

  </div>
</template>

<script>

module.exports = {
  props:{
        picturelink: {type: String},
        userConnected : {type : Object},
        cniUser: {type: String},
        choixCandidat:{type: Object}
    },
    name:"PrisePhoto",
    data(){
        return{
            picture : null,
            prisePhoto : true
        }
    },
    mounted(){
      console.log(this.choixCandidat)

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

      let takePictureBtn = document.getElementById('takePictureBtn')

      takePictureBtn.addEventListener('click', takePicture);

      let utiliserPhotoBtn = document.getElementById('utiliserPhotoBtn')

      utiliserPhotoBtn.addEventListener('click', closWebcam);

      function closWebcam(){
        webcam.stop()
      }

      function takePicture(){
          this.picture = webcam.snap();
          document.getElementById('pictureDiv').innerHTML = 
            '<img src="' + this.picture +'"/>'

      }

    },
    methods : {
      lancerReconnaissance(){
        this.picture = document.getElementById('pictureDiv').childNodes[0].src
        this.prisePhoto = false;
        // this.$emit('picture-taken', this.picture)

        // this.$router.push('/ReconnaissanceFaciale')
      }
    },
    components : {
      ReconaissanceFaciale
    }

}
</script>

<style scoped>
.webcam{
  display: flex;
  flex-direction: column;
}

.container > div{
  margin-top: 60px;
}

.container{
  width: fit-content;
  margin-left: auto;
}
</style>