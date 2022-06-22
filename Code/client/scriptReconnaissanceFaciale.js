
let imageUpload = document.getElementById('imageUpload')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
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
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove()
    image = await faceapi.bufferToImage(imageUpload.files[0])
    canvas = faceapi.createCanvasFromMedia(image)
    let displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    let detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    let resizedDetections = faceapi.resizeResults(detections, displaySize)
    let results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      console.log('Utilisateur reconnu : ' + result.label)
    })
  })
}

function loadLabeledImages() {
  let labels = ['Thor', 'Theo']
  return Promise.all(
    labels.map(async label => {
      let descriptions = []
      for (let i = 1; i <= 2; i++) {
        let img = await faceapi.fetchImage(`/labeled_images/${label}${i}.jpg`)
        let detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
