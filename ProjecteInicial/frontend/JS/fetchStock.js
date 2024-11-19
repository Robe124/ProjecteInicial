async function obtenerStock() {
    try {
        const response = await fetch('https://anticaroma.cat/stock'); // Cambiado a dominio
        const stock = await response.json();
        console.log(stock);
        mostrarStock(stock);
    } catch (error) {
        console.error('Error al obtener el stock:', error);
    }
}

async function comprarProducto(producto, cantidad) {
    try {
        const response = await fetch('https://anticaroma.cat/comprar', { // Cambiado a dominio
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ producto, cantidad }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Compra realizada: ${producto}, Cantidad: ${cantidad}`);
            obtenerStock();
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        alert('Error al realizar la compra.');
    }
}
