async function cargarComandas() {
    try {
        const respuesta = await fetch('http://localhost:3000/comandas');
        const comandas = await respuesta.json();

        if (!Array.isArray(comandas)) {
            console.error('Respuesta no válida del servidor:', comandas);
            return;
        }

        const tabla = document.getElementById('tabla-comandas').querySelector('tbody');
        tabla.innerHTML = '';

        comandas.forEach(comanda => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${comanda.id}</td>
                <td>${comanda.mesa}</td>
                <td>${comanda.producto_id}</td>
                <td>${comanda.cantidad}</td>
                <td>${new Date(comanda.fecha).toLocaleString()}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar las comandas:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarComandas);
