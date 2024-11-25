document.addEventListener('DOMContentLoaded', async function() {
    /* Llamar al servidor para que te dé la 
    colección de productos.*/
    const pizzas = await obtenerStock();
    
    mostrarCatalogo(pizzas);
});

function mostrarCatalogo(pizzas) {
    // Crear estilos dinámicamente
    const style = document.createElement("style");
    style.textContent = `
    body {
        background-color: #f9f9f9;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }

    .catalog-container {
        display: flex;
        flex-wrap: wrap; /* Permite que las cartas pasen a la siguiente fila si no caben */
        gap: 20px; /* Espacio entre las cartas */
        justify-content: center; /* Centra las cartas horizontalmente */
        padding: 20px;
    }

    .card {
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 10px; /* Bordes redondeados */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
        overflow: hidden;
        width: calc(25% - 20px); /* Las cartas ocupan un 25% del ancho del contenedor, menos el gap */
        min-width: 250px; /* Tamaño mínimo para pantallas pequeñas */
        display: flex;
        flex-direction: column; /* Para que el contenido esté apilado verticalmente */
    }

    .card img {
        width: 100%; /* La imagen ocupa todo el ancho de la carta */
        height: auto; /* Mantiene las proporciones */
        border-bottom: 1px solid #ddd; /* Línea debajo de la imagen */
    }

    .card-content {
        padding: 15px;
        text-align: center;
    }

    .card-content h3 {
        font-size: 1.2em;
        margin-bottom: 10px;
        color: #333;
    }

    .card-content p {
        margin: 5px 0;
        color: #666;
    }

    .card-footer {
        padding: 10px 15px;
        text-align: center;
        border-top: 1px solid #ddd;
        background-color: #f5f5f5;
    }

    .card-footer select {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .sold-out {
        color: red;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        .card {
            width: calc(50% - 20px); /* Dos cartas por fila en pantallas medianas */
        }
    }

    @media (max-width: 480px) {
        .card {
            width: calc(100% - 20px); /* Una carta por fila en pantallas pequeñas */
        }
    }
`;

    document.head.appendChild(style);

    // Crear el catálogo dinámico
    let html = "<div class='catalog-container'>";

    pizzas.forEach(pizza => {
        html += `
            <div class="card">
                <img src="${pizza.picture}" alt="${pizza.producto}">
                <div class="card-content">
                    <h3>${pizza.producto}</h3>
                    <p>Precio: $${pizza.precio}</p>
                    <p>Disponible: ${pizza.cantidad}</p>
                </div>
                <div class="card-footer">
                    ${
                        pizza.cantidad === 0
                            ? "<span class='sold-out'>Sold Out</span>"
                            : `<select id="${pizza.id}" onchange='actualizarCantidad("${pizza.id}", this.value)'>
                                    <option value="1">x1</option>
                                    <option value="2">x2</option>
                                    <option value="3">x3</option>
                                    <option value="4">x4</option>
                               </select>`
                    }
                </div>
            </div>
        `;
    });

    html += "</div>";

    const contenedorImagenes = document.getElementById("contenedorImagenes");
    contenedorImagenes.innerHTML = html;
}

function actualizarCantidad(productoId, cantidad) {
    actualizarCantidadPorProductoId(productoId, cantidad);
    location.reload(); 
}