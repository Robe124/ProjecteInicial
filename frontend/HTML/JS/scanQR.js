document.getElementById("Boton-Volver").onclick = function() {
    window.location.href = "./index.html";
};

window.addEventListener('load', function() {
     const codeReader = new ZXing.BrowserQRCodeReader();

     const videoElement = document.getElementById('video');

     codeReader.getVideoInputDevices().then(videoInputDevices => {
        const firstDeviceId = videoInputDevices[0].deviceId;

         codeReader.decodeOnceFromVideoDevice(firstDeviceId, 'video').then(result => {
             document.getElementById('result').textContent = result.text;
        }).catch(err => {
            console.error(err);
        });
    });
});