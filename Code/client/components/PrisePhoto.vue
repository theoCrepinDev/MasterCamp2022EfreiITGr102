<template>
    <div id="app">
    <div class="webcam">
      <video id="webcam" autoplay playsinline width="640" height="480"></video>
      <canvas id="canvas" class="d-none"></canvas>
      <audio id="snapSound" src="audio/snap.wav" preload = "auto"></audio>
      <button @click="takePicture()">Take picture</button>
    </div>

  </div>
</template>

<script type="module" src="https://unpkg.com/webcam-easy/dist/webcam-easy.min.js"></script>
<script type = "module" src="webcam-easy.js"></script>

<script>

export default  {
    name:"PrisePhoto",
    data(){
        return{
            webcam: null,
            picture : null
        }
    },
    mounted(){
      const webcamElement = document.getElementById('webcam');
      const canvasElement = document.getElementById('canvas');
      const snapSoundElement = document.getElementById('snapSound');
      this.webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

      this.webcam.start()
      .then(result =>{
          console.log("webcam started");
      })
      .catch(err => {
        console.log(err);
      });

    },
    methods : {
      takePicture(){
        this.picture = this.webcam.snap();
      }
    }

}
</script>