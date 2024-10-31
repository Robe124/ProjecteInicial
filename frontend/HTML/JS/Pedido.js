document.getElementById('pedidoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los valores del formulario
    const producto_id = document.getElementById('producto_id').value;
    const cantidad = document.getElementById('cantidad').value;

    // Enviar los datos al backend
    fetch('http://localhost:3000/api/pedido', { // Cambia la URL si tu backend está en otro dominio
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            producto_id: parseInt(producto_id),
            cantidad: parseInt(cantidad)
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la conexión al servidor');
        }
        return response.json();
    })
    .then(data => {
        // Manejar la respuesta del servidor
        console.log(data);
        document.getElementById('mensaje').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensaje').innerText = 'Error al procesar el pedido';
    });
});
