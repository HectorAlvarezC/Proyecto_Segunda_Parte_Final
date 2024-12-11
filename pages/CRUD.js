// Crear Producto
document.getElementById('form-crear').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre-crear').value;
    const precio = document.getElementById('precio-crear').value;

    fetch('/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio })
    }).then((res) => res.text()).then(alert);
});

// Leer Productos
function cargarProductos() {
    fetch('/productos')
        .then((res) => res.json())
        .then((productos) => {
            const lista = document.getElementById('lista-productos');
            lista.innerHTML = '';
            productos.forEach((producto) => {
                const item = document.createElement('li');
                item.textContent = `${producto.id} - ${producto.nombre}: $${producto.precio}`;
                lista.appendChild(item);
            });
        });
}

// Actualizar Producto
document.getElementById('form-actualizar').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id-actualizar').value;
    const nombre = document.getElementById('nombre-actualizar').value;
    const precio = document.getElementById('precio-actualizar').value;

    fetch(`/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio })
    }).then((res) => res.text()).then(alert);
});

// Eliminar Producto
document.getElementById('form-eliminar').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id-eliminar').value;

    fetch(`/productos/${id}`, {
        method: 'DELETE'
    }).then((res) => res.text()).then(alert);
});
