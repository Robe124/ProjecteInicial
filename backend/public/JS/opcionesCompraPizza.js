document.addEventListener('DOMContentLoaded', async function() {
    /* Llamar al servidor para que te dé la 
    colección de productos.*/
    const pizzas = await obtenerStock();
    
    mostrarCatalogo(pizzas);
});

function mostrarCatalogo(pizzas) {
    let html = "<table>";
    html += "<thead>"
    html += "<tr>"
    html += "<th>Id</th>"
    html += "<th>Descripción</th>"
    html += "<th>Precio</th>"
    html += "<th>Cantidad</th>"
    html += "<th>Imagen</th>"
    html += "<th>Cantidad elegida</th>"
    html += "</tr>"
    html += "</thead>"
    html += "<tbody>"

    for(let i = 0; i< pizzas.length;i++) {
        const pizza = pizzas[i];
        html += "<tr>"
        html += "<td>" + pizza.id + "</td>"
        html += "<td>" + pizza.producto + "</td>"
        html += "<td>" + pizza.precio + "</td>"
        html += "<td>" + pizza.cantidad + "</td>"
        html += "<td><img src='" + pizza.picture + "' height='75%' width='100%'/></td>"
        if (pizza.cantidad === 0) {
            html += "<td>sold out</td>";
        } else {
            html += "<td><select id ='" + pizza.id + "' onchange='actualizarCantidad(\"" + pizza.id + "\", this.value)'>" +
            "<option value='1'>x1</option>"+
            "<option value='2'>x2</option>"+
            "<option value='3'>x3</option>"+
            "<option value='4'>x4</option>"+
            "</select>" +
            "</td>"
        }
        
        html += "</tr>"
    }
    html += "</tbody>"
    html += "</table>";

    const contenedorImagenes = document.getElementById("contenedorImagenes");
    contenedorImagenes.innerHTML = html;
}


function actualizarCantidad(productoId, cantidad) {
    actualizarCantidadPorProductoId(productoId, cantidad);
    location.reload(); 
}