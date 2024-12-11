// Función para obtener las compras desde el servidor y mostrarlas en la tabla
const obtenerCompras = () => {
    fetch('/compras')  // Ruta para obtener todas las compras
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('tabla-compras').getElementsByTagName('tbody')[0];
            tabla.innerHTML = '';  // Limpiar la tabla antes de agregar las nuevas filas

            data.forEach(compra => {
                const fila = document.createElement('tr');

                // Crear celdas con los datos de la compra
                const celdaId = document.createElement('td');
                celdaId.textContent = compra.producto_id;
                fila.appendChild(celdaId);

                const celdaNombre = document.createElement('td');
                celdaNombre.textContent = compra.nombre;
                fila.appendChild(celdaNombre);

                const celdaPrecio = document.createElement('td');
                celdaPrecio.textContent = compra.precio;
                fila.appendChild(celdaPrecio);

                const celdaCantidad = document.createElement('td');
                celdaCantidad.textContent = compra.cantidad;
                fila.appendChild(celdaCantidad);

                const celdaTipo = document.createElement('td');
                celdaTipo.textContent = compra.tipo;
                fila.appendChild(celdaTipo);

                // Crear celda de acciones con botón para eliminar
                const celdaAcciones = document.createElement('td');
                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.onclick = () => eliminarCompra(compra.id);  // Llamamos a la función de eliminación
                celdaAcciones.appendChild(botonEliminar);
                fila.appendChild(celdaAcciones);

                // Agregar la fila a la tabla
                tabla.appendChild(fila);
            });
        })
        .catch(error => console.error('Error al obtener las compras:', error));
};

// Función para eliminar una compra
const eliminarCompra = (id) => {
    fetch(`/compras/${id}`, {  // Llamamos a la ruta DELETE con el ID
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Compra eliminada correctamente');
            obtenerCompras();  // Recargamos las compras después de eliminar
        } else {
            alert('Hubo un error al eliminar la compra');
        }
    })
    .catch(error => {
        console.error('Error al eliminar la compra:', error);
    });
};

// Llamar a la función al cargar la página para mostrar las compras actuales
window.onload = obtenerCompras;
