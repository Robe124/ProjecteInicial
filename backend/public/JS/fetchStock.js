async function obtenerStock() {
    try {
        const response = await fetch('http://localhost:3000/stock');
        return await response.json();

    } catch (error) {
        console.error('Error al obtener el stock:', error);
    }
}

async function comprarProducto(producto, cantidad) {
    try {
        console.log('Datos enviados al servidor:', { producto, cantidad });
        const response = await fetch('http://anticaroma.cat/comprar', {
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

// Agregar evento al botón después de que el DOM esté cargado
// const botonFinalizarCompra = document.getElementById('botonFinalizarCompra');

// if (botonFinalizarCompra) {
//     botonFinalizarCompra.addEventListener('click', () => {
//         const producto = 'Margaritha';  
//         const cantidad = 2;  

//         comprarProducto(producto, cantidad);
//     });
// // } else {
// //     console.error("El elemento con ID 'botonFinalizarCompra' no existe.");
// // }
