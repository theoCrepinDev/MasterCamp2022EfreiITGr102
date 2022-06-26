//Reconnaissance faciale basée sur face-api
//grandement inspiré de tutoriel sur https://www.npmjs.com/package/face-api.js

//ajout de la fonction webcam avec package webcam-easy
// https://www.npmjs.com/package/webcam-easy



var labels = []

let userCNI= document.getElementById('CNIUserConnected').innerText
labels.push(userCNI)

await axios.get('/api/CNI').then(response => {
  console.log(response.data)
  console.log(response)
  for(let i = 0; i < response.data.length; i++){
    labels.push('' + response.data[i].No_CNI + '')
  }
})

let imageUpload = document.getElementById('imageUpload')
let imageDiv = document.getElementById('imgPrise')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/files/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/files/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/files/models')
]).then(start)

async function start() {
  let container = document.createElement('div')
  container.style.position = 'relative'
  container.style.maxHeight = '300px'
  container.style.maxWidth = '300px'
  document.body.append(container)
  let labeledFaceDescriptors = await loadLabeledImages()
  let faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  let image
  let canvas
  console.log('Module Prêt')
  // imageUpload.addEventListener('change', async () => {
    image = document.getElementById('imgPrise')
    canvas = faceapi.createCanvasFromMedia(image)
    let displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    let detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    let resizedDetections = faceapi.resizeResults(detections, displaySize)
    let results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    if(results.length == 0) {
      console.log('Aucun visage détecté')
      //supprimé les photo de modeles
    }
    results.forEach((result, i) => {
      console.log('Utilisateur reconnu : ' + result.label)
      if(verifUserWithRecognitionResult(result.label)){
        let btnValide = document.getElementById('btnValiderVote')
        btnValide.style.display = ''
      }
    })
  // })
}



function verifUserWithRecognitionResult(result){
  let userCNI= document.getElementById('CNIUserConnected').innerText
  console.log(result === userCNI)
  return (result === userCNI);
}

function loadLabeledImages() {
  
  return Promise.all(
    labels.map(async label => {
      let descriptions = []
      for (let i = 1; i <= 2; i++) {
        let img = await faceapi.fetchImage(`/files/labeled_images/${label}${i}.jpg`)
        let detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
