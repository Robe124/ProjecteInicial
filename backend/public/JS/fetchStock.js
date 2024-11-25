async function obtenerPizzasDelMes() {
    try {
        const response = await fetch('http://localhost:3000/');
        return  await response.json();        
    } catch (error) {
        console.error('Error al obtener las pizzas destacadas del mes:', error);
        return null;
    }
}

async function actualizarCantidadPorProductoId(productId, cantidad) {
    console.log("fetchStock, productId, cantidad");
    try {
        const response = await fetch('http://localhost:3000/update', 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id:productId, cantidad}),
              }
            );

        return  await response.json();        
    } catch (error) {
        console.error('Error al obtener las pizzas destacadas del mes:', error);
        return null;
    }
}

async function obtenerStock() {
    try {
        const response = await fetch('http://localhost:3000/stock');
        return await response.json();

    } catch (error) {
        console.error('Error al obtener el stock:', error);
        return null;
    }
}

async function comprarProducto(producto, cantidad) {
    try {
        console.log('Datos enviados al servidor:', { producto, cantidad });

        const response = await fetch('http://localhost:3000/comprar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ producto, cantidad }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Compra realizada: ${producto}, Cantidad: ${cantidad}`);
            obtenerStock();
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        alert('Error al realizar la compra.');
    }
}

