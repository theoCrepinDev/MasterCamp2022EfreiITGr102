<template>
    <div id="reconnaissanceFaiciale" class="container center">
        <p>Analyse du fichier en cours....</p>
        <p>Si vous n'êtes pas redirigé d'ici 20 secondes actualisé la page...</p>
        <input type="file" id="imageUpload">
    </div>
</template>

<script>

module.exports = {
    mounted(){
        let recaptchaScript = document.createElement('script') 
        recaptchaScript.setAttribute('src', 'scriptReconnaissanceFaciale.js') 
        document.head.appendChild(recaptchaScript)

    }
}

</script>
