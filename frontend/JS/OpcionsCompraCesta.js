 function añadirACesta(producto, precio) {
    let cesta = JSON.parse(localStorage.getItem('cesta')) || [];
    
     let productoExistente = cesta.find(item => item.nombre === producto);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;   
    } else {
        cesta.push({
            nombre: producto,
            precio: precio,
            cantidad: 1
        });
    }

    localStorage.setItem('cesta', JSON.stringify(cesta));

     actualizarStockEnBD(producto, 1);   
    actualizarCesta();   
}

 function eliminarDeCesta(producto) {
    let cesta = JSON.parse(localStorage.getItem('cesta')) || [];
    
     let productoEliminar = cesta.find(item => item.nombre === producto);

     if (productoEliminar) {
        cesta = cesta.filter(item => item.nombre !== producto);

        actualizarStockEnBD(producto, -productoEliminar.cantidad);  
    }

    localStorage.setItem('cesta', JSON.stringify(cesta));
    actualizarCesta();   
}

 function actualizarStockEnBD(producto, cantidad) {
    fetch('actualizar_cesta.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto: producto, cantidad: cantidad })
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
