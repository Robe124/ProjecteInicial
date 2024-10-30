 
    // Crear un objeto para almacenar los productos en la cesta
    const cesta = {};

    function añadirACesta(productoID) {
        // Añadir producto a la cesta o incrementar cantidad
        if (cesta[productoID]) {
            cesta[productoID]++;
        } else {
            cesta[productoID] = 1;
        }

        // Actualizar la visualización de la cesta
        mostrarCesta();
    }

    function mostrarCesta() {
        const listaCesta = document.getElementById('listaCesta');
        listaCesta.innerHTML = ''; // Limpiar la lista actual

        // Crear elementos de lista para cada producto
        for (const [productoID, cantidad] of Object.entries(cesta)) {
            const item = document.createElement('li');
            item.textContent = `${productoID}: ${cantidad}`;
            listaCesta.appendChild(item);
        }
    }
 