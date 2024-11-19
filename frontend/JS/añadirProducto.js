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

    alert("Producto añadido a la cesta");
}

function mostrarCesta() {
    const cesta = obtenerCesta();
    const items = Object.entries(cesta);
    if (items.length === 0) {
        console.log("La cesta está vacía.");
        return;
    }

    console.log("Contenido de la cesta:");
    items.forEach(([productoID, datos]) => {
        console.log(`Producto: ${productoID}, Cantidad: ${datos.cantidad}, Precio: ${datos.precio}`);
    });
}
