// Archivo: opcionesCompraPizza.js

document.addEventListener('DOMContentLoaded', async function() {
    const pizzas = await obtenerStock();
    mostrarCatalogo(pizzas);
    inicializarCarrito();
});

let carrito = [];

async function obtenerStock() {
    try {
        const response = await fetch('/stock');
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error al obtener el stock de productos');
            return [];
        }
    } catch (error) {
        console.error('Error al obtener el stock:', error);
        return [];
    }
}

 function mostrarCatalogo(pizzas) {
    const style = document.createElement("style");
    style.textContent = `
    body {
        background-color: #400505;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        color: #333;
    }

    .catalog-container {
    display: flex;
    gap: 20px;
    padding: 40px;
    max-width: 1200px;
    margin: 49px;
    text-align: center;
    flex-direction: column;
    align-items: center;
¡    }
    .card {
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: calc(25% - 20px);
        min-width: 280px;
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
    .card img {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #ddd;
    }
    .card-content {
        padding: 20px;
        text-align: center;
    }
    .card-content h3 {
        font-size: 1.4em;
        margin-bottom: 10px;
        color: #800000;  
        font-weight: bold;
    }
    .card-content p {
        margin: 10px 0;
        color: #6c2121;
        font-size: 1.1em;
    }
    .card-footer {
        padding: 20px;
        text-align: center;
        border-top: 1px solid #ddd;
        background-color: #f9f9f9;
    }
    .card-footer button {
        padding: 12px 25px;
        border: none;
        border-radius: 25px;
        background-color: #e6cb51;        
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 1em;
    }
    .card-footer button:hover {
        background-color: #218838;
    }
    .sold-out {
        color: red;
        font-weight: bold;
    }
    #carrito {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        color: black;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        padding: 30px;
        z-index: 1000;
        display: none;
        flex-direction: column;
        align-items: center;
        width: 400px;
        border-radius: 15px;
    }
    #carrito h3 {
        margin: 0 0 20px 0;
        font-weight: bold;
        color: #007bff;
    }
    #carrito ul {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
    }
    #carrito ul li {
        margin-bottom: 15px;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 10px;
    }
    #carrito-total {
        font-weight: bold;
        margin-top: 20px;
        font-size: 1.2em;
        color: #333;
    }

    
    }
    #carrito-toggle {
    position: fixed;
    top: 200px; 
    left: 50%;
    transform: translateX(-50%);
    background-color: #f8f8f8; /* Blanco roto */
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 14px;  
    font-weight: bold;
    z-index: 1000;  
    transition: background-color 0.3s, transform 0.3s;
    }

    #carrito-toggle:hover {
    background-color: #eaeaea;
    transform: translateX(-50%) scale(1.05);
    } 
}

    button {
        outline: none;
    }
    @media (max-width: 768px) {
        .card {
            width: calc(50% - 20px);
        }
        #carrito {
            width: 80%;
        }
    }
    @media (max-width: 480px) {
        .card {
            width: calc(100% - 20px);
        }
        #carrito-toggle {
            top: 185px;
            right: 144px;
        }
    }
    `;
    document.head.appendChild(style);

    let html = "<div class='catalog-container'>";
    pizzas.forEach(pizza => {
        html += `
            <div class="card">
                <img src="${pizza.picture}" alt="${pizza.producto}">
                <div class="card-content">
                    <h3>${pizza.producto}</h3>
                    <p>Preu: €${parseFloat(pizza.precio).toFixed(2)}</p>
                    <p>Disponible: ${pizza.cantidad}</p>
                </div>
                <div class="card-footer">
                    ${
                        pizza.cantidad === 0
                            ? "<span class='sold-out'>Sold Out</span>"
                            : `<button onclick='añadirAlCarritoDesdeCatalogo(${JSON.stringify(pizza)})'>Agregar a la cistella</button>`
                    }
                </div>
            </div>
        `;
    });
    html += "</div>";

    const contenedorImagenes = document.getElementById("contenedorImagenes");
    contenedorImagenes.innerHTML = html;
}

function añadirAlCarritoDesdeCatalogo(pizza) {
    const productoEnCarrito = carrito.find(item => item.id === pizza.id);
    const precio = parseFloat(pizza.precio); // Convertir precio a número

    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad < pizza.cantidad) {
            productoEnCarrito.cantidad++;
        } else {
            alert('No hay suficiente stock');
        }
    } else {
        carrito.push({ id: pizza.id, producto: pizza.producto, precio: precio, cantidad: 1 });
    }
    actualizarCarrito();
}

 function actualizarCarrito() {
    const carritoLista = document.getElementById("carrito-lista");
    carritoLista.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        carritoLista.innerHTML += `<li>${item.producto} - $${item.precio.toFixed(2)} x ${item.cantidad}</li>`;
        total += item.precio * item.cantidad;
    });

    document.getElementById("carrito-total").textContent = `Total: $${total.toFixed(2)}`;
    const carritoElement = document.getElementById("carrito");
    carritoElement.style.display = "block";
}

// Inicializar el carrito (UI)
function inicializarCarrito() {
    const carritoHtml = `
        <div id="carrito">
            <h3>Cistella de la compra</h3>
            <label for="mesa">Número de Mesa:</label>
            <input type="number" id="mesa" placeholder="Introduce el número de mesa" required>
            <ul id="carrito-lista"></ul>
            <p id="carrito-total">Total: 0.00€</p>
            <button onclick="finalizarCompra()">Acabar Comanda</button>
        </div>
        <button id="carrito-toggle" onclick="toggleCarrito()">Mostrar cistella</button>
    `;
    document.body.insertAdjacentHTML('afterbegin', carritoHtml);
}


// Mostrar/ocultar carrito
function toggleCarrito() {
    const carritoElement = document.getElementById("carrito");
    carritoElement.style.display = carritoElement.style.display === "none" ? "block" : "none";
}

// Finalizar compra

async function finalizarCompra() {
    const mesa = document.getElementById('mesa').value;

    if (!mesa || carrito.length === 0) {
        alert("Por favor, introduce el número de mesa y añade productos al carrito.");
        return;
    }

     try {
        const response = await fetch('http://localhost:3000/comandas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mesa: parseInt(mesa),
                productos: carrito,  
            }),
        });

        const data = await response.json();

        if (response.ok) {
             for (const item of carrito) {
                await actualizarCantidadPorProductoId(item.id, item.cantidad);  
            }

            alert("Comanda registrada con éxito.");
            carrito = []; 
            actualizarCarrito();  
            window.location.href = 'index.html';  
        } else {
            alert(`Error al registrar la comanda: ${data.error}`);
        }
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        alert("Error al registrar la comanda.");
    }
}




 function validarCarrito() {
    if (!carrito || carrito.length === 0) {
        return false;
    }
    for (const item of carrito) {
        if (!item.id || !item.producto || typeof item.precio !== 'number' || typeof item.cantidad !== 'number' || item.cantidad <= 0) {
            console.error('Producto inválido en el carrito:', item);
            return false;
        }
    }
    return true;
}
