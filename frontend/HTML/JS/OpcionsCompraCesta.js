document.addEventListener('DOMContentLoaded', mostrarCesta);

let cesta = JSON.parse(localStorage.getItem('cesta')) || {};

function agregarACesta(producto, cantidad, precio) {
    if (cesta[producto]) {
        cesta[producto].cantidad += parseInt(cantidad);
    } else {
        cesta[producto] = { cantidad: parseInt(cantidad), precio };
    }
    localStorage.setItem('cesta', JSON.stringify(cesta));
    mostrarCesta();
}

function mostrarCesta() {
    const listaCesta = document.getElementById('listaCesta');
    listaCesta.innerHTML = ''; 

    let totalProductos = 0;
    let totalPrecio = 0;

    for (const [productoID, { cantidad, precio }] of Object.entries(cesta)) {
        const item = document.createElement('div');
        item.classList.add('producto-item');
        item.innerHTML = `
            <span>${productoID} - ${cantidad} x ${precio} €</span>
            <button onclick="('${productoID}')">Eliminar</button>
        `;
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

function eliminarDeCesta(producto) {
    let cesta = JSON.parse(localStorage.getItem('cesta')) || {};

    if (cesta[producto]) {
        delete cesta[producto];

        localStorage.setItem('cesta', JSON.stringify(cesta));
        mostrarCesta();
    }
}
