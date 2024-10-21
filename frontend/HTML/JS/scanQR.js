const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const startButton = document.getElementById("start-button");

startButton.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
  video.srcObject = stream;
  video.setAttribute("playsinline", true);
  video.play();
  tick();
};

function tick() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    try {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const result = jsQR(imageData.data, canvas.width, canvas.height);
      if (result) {
        alert(`QR Code detected: ${result.data}`);
        video.srcObject.getTracks().forEach(track => track.stop()); // Detener la cámara
      }
    } catch (e) {
      // Ignorar errores si no hay suficiente luz o si el QR no es legible
    }
  }
  requestAnimationFrame(tick);
}
