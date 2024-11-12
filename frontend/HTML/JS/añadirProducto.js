 function obtenerCesta() {
    return JSON.parse(localStorage.getItem('cesta')) || {};
}

function guardarCesta(cesta) {
    localStorage.setItem('cesta', JSON.stringify(cesta));
}

function añadirACesta(productoID, precio) {
    const cesta = obtenerCesta();  

    let cantidad = cesta[productoID] ? cesta[productoID].cantidad + 1 : 1;
    precio = parseFloat(precio);

    if (isNaN(precio)) {
        console.error("Precio no válido para el producto:", productoID);
        return;
    }

    cesta[productoID] = { cantidad: cantidad, precio: precio };
    guardarCesta(cesta);

     actualizarStockEnBD(productoID, 1);  

    alert("Producto añadido a la cesta");
}

 function actualizarStockEnBD(productoID, cantidad) {
    fetch('actualizar_cesta.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productoID: productoID, cantidad: cantidad })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Stock actualizado en la base de datos.');
        } else {
            console.error('Error al actualizar el stock:', data.error);
        }
    })
    .catch(error => console.error('Error de conexión:', error));
}

 document.addEventListener('DOMContentLoaded', actualizarCesta);
