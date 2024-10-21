document.getElementById("Boton-Volver").onclick = function() {
    window.location.href = "./index.html";
};

const html5QrcodeScanner = new Html5Qrcode("reader");
html5QrcodeScanner.start(
    { facingMode: "environment" }, 
    {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    },
    qrCodeMessage => {
        console.log(qrCodeMessage);
        window.location.href = "https://anticaromaristorante.netlify.app/OpcionsCompra";
    },
    errorMessage => {
        console.log(errorMessage);
    })
    .catch(err => {
        console.error("Error al iniciar el escáner:", err);
    });