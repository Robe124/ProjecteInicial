document.addEventListener('DOMContentLoaded', async function() {
    await cargarComandas();
    await cargarEstadisticas();
});

async function cargarComandas() {
    try {
        const response = await fetch('/comandas');
        if (response.ok) {
            const comandas = await response.json();
            const tbody = document.querySelector('#tabla-comandas tbody');
            comandas.forEach(comanda => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${comanda.id}</td>
                    <td>${new Date(comanda.fecha).toLocaleString()}</td>
                    <td>$${parseFloat(comanda.total).toFixed(2)}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            console.error('Error al obtener las comandas');
        }
    } catch (error) {
        console.error('Error al obtener las comandas:', error);
    }
}

async function cargarEstadisticas() {
    try {
        const response = await fetch('/estadisticas/pizzas');
        if (response.ok) {
            const estadisticas = await response.json();
            const pizzaStats = document.getElementById('pizza-stats');
            estadisticas.forEach(pizza => {
                const div = document.createElement('div');
                div.classList.add('pizza');
                div.innerHTML = `
                    <h4>${pizza.nombre_producto}</h4>
                    <p>Vendidas: ${pizza.total_vendidas}</p>
                `;
                pizzaStats.appendChild(div);
            });
        } else {
            console.error('Error al obtener las estadísticas');
        }
    } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
    }
}
