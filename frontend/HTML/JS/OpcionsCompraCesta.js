// Crear un objeto para almacenar los productos en la cesta
let cesta = JSON.parse(localStorage.getItem('cesta')) || {};

function añadirACesta(productoID, precio) {
    // Añadir producto a la cesta o incrementar cantidad
    if (cesta[productoID]) {
        cesta[productoID].cantidad++;
    } else {
        cesta[productoID] = { cantidad: 1, precio: precio };
    }

    // Guardar la cesta en localStorage
    localStorage.setItem('cesta', JSON.stringify(cesta));

    // Actualizar la visualización de la cesta
    mostrarCesta();
}

function mostrarCesta() {
    const listaCesta = document.getElementById('listaCesta');
    listaCesta.innerHTML = ''; // Limpiar la lista actual

    let totalProductos = 0;
    let totalPrecio = 0;

    // Crear elementos de lista para cada producto
    for (const [productoID, { cantidad, precio }] of Object.entries(cesta)) {
        const item = document.createElement('li');
        item.textContent = `${productoID}: ${cantidad} x ${precio} €`;
        listaCesta.appendChild(item);

        totalProductos += cantidad;
        totalPrecio += cantidad * precio;
    }

    // Actualizar total de productos y precio
    document.getElementById('numeroProductos').textContent = totalProductos;
    document.getElementById('precioTotal').textContent = `${totalPrecio.toFixed(2)} €`;
}

function toggleCesta() {
    const listaCesta = document.getElementById('listaCesta');
    listaCesta.style.display = (listaCesta.style.display === 'none' || listaCesta.style.display === '') ? 'block' : 'none';
}

// Cargar la cesta al iniciar
document.addEventListener('DOMContentLoaded', mostrarCesta);
