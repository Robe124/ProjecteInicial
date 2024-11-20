function actualizarCesta() {
     let cesta = JSON.parse(localStorage.getItem('cesta')) || [];

     let contenedorCesta = document.getElementById('listaCesta');
    contenedorCesta.innerHTML = ''; 

     if (cesta.length === 0) {
        contenedorCesta.innerHTML = '<p>La cesta está vacía.</p>';
        return;
    }

    // Recorrer los productos en la cesta y agregarlos al contenedor
    cesta.forEach(item => {
        let productoHTML = document.createElement('div');
        productoHTML.className = 'producto-cesta';
        productoHTML.innerHTML = `
            <p>${item.nombre}</p>
            <p>Precio: ${item.precio}€</p>
            <p>Cantidad: ${item.cantidad}</p>
            <button onclick="eliminarDeCesta('${item.nombre}')">Eliminar</button>
        `;
        contenedorCesta.appendChild(productoHTML);
    });

    // Mostrar el total de la cesta
    let total = cesta.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    let totalHTML = document.createElement('div');
    totalHTML.className = 'total-cesta';
    totalHTML.innerHTML = `<p>Total: ${total.toFixed(2)}€</p>`;
    contenedorCesta.appendChild(totalHTML);
}


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
 
