// Generar o recuperar un identificador único para el usuario
function obtenerIdUsuario() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'usuario_' + Date.now(); // Genera un ID único basado en el tiempo
        localStorage.setItem('userId', userId);
    }
    return userId;
}

const userId = obtenerIdUsuario();

// Crear un objeto para almacenar los productos en la cesta del usuario
let cesta = JSON.parse(localStorage.getItem(`cesta_${userId}`)) || {};

// Añadir producto a la cesta y actualizar la vista en tiempo real
function añadirACesta(productoID) {
    // Añadir producto o incrementar cantidad
    if (cesta[productoID]) {
        cesta[productoID]++;
    } else {
        cesta[productoID] = 1;
    }

    // Guardar la cesta en localStorage
    localStorage.setItem(`cesta_${userId}`, JSON.stringify(cesta));

    // Actualizar la visualización de la cesta en tiempo real
    mostrarCesta();
}

// Eliminar un producto de la cesta y actualizar la vista
function eliminarDeCesta(productoID) {
    if (cesta[productoID]) {
        delete cesta[productoID];
        localStorage.setItem(`cesta_${userId}`, JSON.stringify(cesta));
        mostrarCesta();
    }
}

// Mostrar el contenido de la cesta en tiempo real
function mostrarCesta() {
    const numeroProductos = document.getElementById('numeroProductos');
    const precioTotal = document.getElementById('precioTotal');
    const listaCesta = document.getElementById('listaCesta');

    if (!numeroProductos || !precioTotal || !listaCesta) return;

    // Actualizar número de productos y precio total
    numeroProductos.textContent = Object.values(cesta).reduce((acc, val) => acc + val, 0);
    precioTotal.textContent = calcularPrecioTotal() + ' €';

    // Limpiar la lista actual de productos
    listaCesta.innerHTML = ''; 

    // Crear elementos de lista para cada producto
    for (const [productoID, cantidad] of Object.entries(cesta)) {
        const item = document.createElement('li');
        item.textContent = `${productoID}: ${cantidad}`;
        
        // Botón para eliminar el producto
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.onclick = () => eliminarDeCesta(productoID);

        item.appendChild(eliminarBtn);
        listaCesta.appendChild(item);
    }
}

// Calcular el precio total de la cesta
function calcularPrecioTotal() {
    let total = 0;
    for (const [productoID, cantidad] of Object.entries(cesta)) {
        const precio = obtenerPrecioProducto(productoID);
        total += precio * cantidad;
    }
    return total;
}

// Función para obtener el precio del producto (definir precios por ID)
function obtenerPrecioProducto(productoID) {
    const precios = {
        'producto1': 10,
        'producto2': 12,
        'producto3': 9,
        'producto4': 8,
        'producto5': 11,
        'producto6': 13,
        'producto7': 14,
        'producto8': 10,
    };
    return precios[productoID] || 0;
}

// Alternar la visibilidad de la lista de productos
function toggleListaCesta() {
    const listaCestaContainer = document.getElementById('listaCestaContainer');
    listaCestaContainer.style.display = listaCestaContainer.style.display === 'none' ? 'block' : 'none';
}

// Cargar y mostrar la cesta al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cesta = JSON.parse(localStorage.getItem(`cesta_${userId}`)) || {};
    mostrarCesta();
});

// Redirigir a otras páginas y mantener el carrito en localStorage
document.getElementById("PaginaOpcionesBebidas").onclick = function() {
    guardarCesta();
    window.location.href = "../OpcionsCompraBebidas.html";
};

document.getElementById("PaginaOpcionesPasta").onclick = function() {
    guardarCesta();
    window.location.href = "../OpcionsCompraPasta.html";
};

document.getElementById("PaginaOpcionesPizzas").onclick = function() {
    guardarCesta();
    window.location.href = "../OpcionsCompraPizzas.html";
};

// Guardar la cesta actual en localStorage
function guardarCesta() {
    localStorage.setItem(`cesta_${userId}`, JSON.stringify(cesta));
}

// Limpiar el carrito del usuario al finalizar el pedido
document.getElementById("BotonContinuar").onclick = function() {
    finalizarCompra();
};

function finalizarCompra() {
    localStorage.removeItem(`cesta_${userId}`);
    alert('Compra finalizada');
    window.location.href = "./confirmacion.html";
}
