// Crear un objeto para almacenar los productos en la cesta
let cesta = JSON.parse(localStorage.getItem('cesta')) || {};

function añadirACesta(productoID, precio) {
    // Obtener la cantidad seleccionada
    const cantidadSeleccionada = document.getElementById(`cantidad${productoID}`).value;

    // Añadir producto a la cesta o incrementar cantidad
    if (cesta[productoID]) {
        cesta[productoID].cantidad += parseInt(cantidadSeleccionada);
    } else {
        cesta[productoID] = { cantidad: parseInt(cantidadSeleccionada), precio: precio };
    }

    // Guardar la cesta en localStorage
    localStorage.setItem('cesta', JSON.stringify(cesta));

    // Actualizar la visualización de la cesta
    mostrarCesta();
}

function mostrarCesta() {
    const listaCesta = document.getElementById('listaCesta');
    listaCesta.innerHTML = ''; 

    let totalProductos = 0;
    let totalPrecio = 0;

    for (const [productoID, { cantidad, precio }] of Object.entries(cesta)) {
        const item = document.createElement('li');
        item.textContent = `${productoID}: ${cantidad} x ${precio} €`;
        listaCesta.appendChild(item);

        totalProductos += cantidad;
        totalPrecio += cantidad * precio;
    }

    document.getElementById('numeroProductos').textContent = totalProductos;
    document.getElementById('precioTotal').textContent = `${totalPrecio.toFixed(2)} €`;
}

function toggleCesta() {
    const listaCesta = document.getElementById('listaCesta');
    listaCesta.style.display = (listaCesta.style.display === 'none' || listaCesta.style.display === '') ? 'block' : 'none';
}

// Cargar la cesta al iniciar
document.addEventListener('DOMContentLoaded', mostrarCesta);
