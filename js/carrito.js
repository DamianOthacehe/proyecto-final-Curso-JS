function mostrarCarrito(){
    const cartDiv = document.getElementById("cart") //Aca llama al elemento cart que esta declarado en el html
    cartDiv.innerHTML = "";
    let cart = loadCartFromLocalStorage();
    let totalGeneral = 0;
    cart.forEach(item => {
        totalGeneral += item.subtotal;
        const cartItemDiv = document.createElement("div");
        cartItemDiv.innerHTML = `
            <p>Producto: ${item.nombre.toUpperCase()}, Cantidad: ${item.cantidad}, Subtotal: $${item.subtotal}</p>
            <button onclick="agregarOQuitarElementos('${item.id}', 1)">+ 1</button>
            <button onclick="agregarOQuitarElementos('${item.id}', -1)">- 1</button>
        `;
        cartDiv.appendChild(cartItemDiv);
    });

const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<h3>Total General: $${totalGeneral}</h3>`;
    cartDiv.appendChild(totalDiv);

    const botonesDiv = document.createElement("div");
    botonesDiv.innerHTML = `
        <button onclick="comprar()">Comprar</button>
        <button onclick="vaciarCarrito()">Vaciar Carrito</button>
    `;
    cartDiv.appendChild(botonesDiv);
};

function agregarOQuitarElementos(productId, boton) {
    let cart = loadCartFromLocalStorage();
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.cantidad += boton;
        if (cartItem.cantidad <= 0) {
            cart = cart.filter(item => item.id !== productId); // Elimina el producto si la cantidad es 0 o menor
        } else {
            cartItem.subtotal = cartItem.cantidad * cartItem.precio;
        }
        saveCartToLocalStorage(cart);
        mostrarCarrito(); // Vuelve a mostrar el carrito
    }
}

function comprar() {
    let cart = loadCartFromLocalStorage();
    if (cart.length > 0) {
        // Muestra una alerta de compra realizada
        Swal.fire("Compra Realizada; Gracias por su compra");
        vaciarCarrito(); // Vacia el carrito después de la compra
    } else {
        Swal.fire("Carrito Vacío; No hay productos en el carrito");
    }
}

function vaciarCarrito() {
    localStorage.removeItem('cart');
    mostrarCarrito();
}

function saveCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
};

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
});
