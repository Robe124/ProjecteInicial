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
         const item = document.getElementById('productoPlantilla').cloneNode(true);
        item.style.display = 'block'; // Mostrar el elemento
        item.querySelector('.producto-nombre').textContent = productoID;
        item.querySelector('.producto-cantidad').textContent = cantidad;
        item.querySelector('.producto-precio').textContent = precio;
        item.querySelector('.btn-eliminar').setAttribute('onclick', `eliminarDeCesta('${productoID}')`);

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
    if (cesta[producto]) {
        delete cesta[producto];

        localStorage.setItem('cesta', JSON.stringify(cesta));
        mostrarCesta();
    }
}
