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
 
