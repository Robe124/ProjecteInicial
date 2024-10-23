const html5QrCode = new Html5Qrcode("reader");

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    // Se ejecuta cuando se detecta un código QR
    document.getElementById("result").innerText = `Código QR detectado: ${decodedText}`;
    html5QrCode.stop().catch(err => {
        console.error("Error al detener el escáner: ", err);
    });
};

const config = { fps: 10, qrbox: 250 };

html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
    .catch(err => {
        console.error("Error al iniciar el escáner: ", err);
    });