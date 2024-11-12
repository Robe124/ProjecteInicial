function validarFormulario() {
    const numeroTarjeta = document.getElementById('InputNumeroTarjeta').value;
    const csv = document.getElementById('NumeroCSV').value;

    if (numeroTarjeta.length !== 16 || isNaN(numeroTarjeta)) {
        alert("El número de tarjeta debe tener 16 dígitos.");
        return false;
    }

    if (csv.length !== 3 || isNaN(csv)) {
        alert("El código CSV debe tener 3 dígitos.");
        return false;
    }

    alert("Pago exitoso!");
    return true;  
}
