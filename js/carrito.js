function mostrarCarrito(){
    const cartDiv = document.getElementById("cart") //Aca llama al elemento cart que esta declarado en el html
    cartDiv.innerHTML = "";
    let cart = loadCartFromLocalStorage();
    let totalGeneral = 0;
    cart.forEach(item => {
        totalGeneral += item.subtotal;
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-div");
        cartItemDiv.innerHTML = `
        <img class="carrito-producto-imagen" src="${item.imagen}" alt="${item.nombre}">
        <div class="carrito-producto-titulo">
            <h5>Nombre</h5>
            <h3>${item.nombre}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <h5>Cantidad</h5>
            <div class= "boton-cantidad">
                <p>${item.cantidad}</p>
                <button onclick="agregarOQuitarElementos('${item.id}', 1)">+ 1</button>
                <button onclick="agregarOQuitarElementos('${item.id}', -1)">- 1</button>
            </div>
        </div>
        <div class="carrito-producto-precio">
            <h5>Precio</h5>
            <p>$${item.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <h5>Subtotal</h5>
            <p>$${item.subtotal}</p>
        </div>
        <button class="boton-eliminar" onclick="eliminarProducto('${item.id}')"><img src="../img/eliminar.png" alt="eliminar">
        </button>`;
        cartDiv.appendChild(cartItemDiv);
    });

const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<h2>Total: $${totalGeneral}</h2>`;
    cartDiv.appendChild(totalDiv);
    totalDiv.classList.add("total");

    const botonesDiv = document.createElement("div");
    botonesDiv.innerHTML = `
    <button class="boton-vaciar" onclick="vaciarCarrito()">Vaciar Carrito</button>
        <button class="boton-comprar" onclick="comprar()">Comprar</button>
    `;
    botonesDiv.classList.add("botonesDiv")
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

function eliminarProducto(productId) {
    let cart = loadCartFromLocalStorage();
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage(cart);
    mostrarCarrito();
}

function comprar() {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
        Swal.fire({
            icon: "error",
            title: "Inicia sesion para realizar tu compra",
            footer: '<a href="../pages/registro.html">Iniciar sesion / registrarme</a>'
        });
        return;
    }
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
