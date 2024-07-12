const insumosDiv = document.createElement("div");
insumosDiv.classList = "insumos";


let insumos = [];
fetch("./js/productos.json")
.then(response => response.json())
.then(data => {
    insumos = data;
    mostrarLista(insumos);
})


function mostrarLista() {
    insumosDiv.innerHTML = ""; // aca declaro null para que tome el array actualizado y lo muestre luego de la iteracion.
    insumos.forEach(element => {
        let producto1 = document.createElement("div");//Creo un elemento <div>
        let card = `<img class="producto-imagen" src="${element.imagen}" alt="${element.titulo}">
                    <h2 class="producto-titulo">${element.titulo}</h2>
                    <h3 class="producto-precio">$${element.precio}</h3>
                    <button class="addToCart" onclick = "addToCart('${element.id}',1)">Agregar a mi carrito</button>`;
        producto1.innerHTML = card;
        insumosDiv.appendChild(producto1);
    });
    document.getElementById("contenedor-productos").appendChild(insumosDiv);
};


function addToCart(productId, cantidad){//para cuando el producto no existe

    let cart = loadCartFromLocalStorage();
    const insumo = insumos.find(p => p.id === productId);
    if(!insumo){
        alert("El producto no fue encontrado");
        return;//para que salga de la funcion
    }else{
        const cartItem = cart.find(item => item.id === productId);
        if(cartItem){//aumenta la cantidad del producto que ya esta en el carrito
            cartItem.cantidad ++;
            cartItem.subtotal = cartItem.cantidad * cartItem.precio;
        } else{//agrega un nuevo producto al carrito
            cart.push({
                id: insumo.id,
                nombre: insumo.titulo,
                imagen: insumo.imagen,
                precio: insumo.precio,
                cantidad: cantidad,
                subtotal: cantidad * insumo.precio
            });
        }
        Toastify({
            text: "Agregado al carrito",
            duration: 1000,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "#37587E",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    }
    saveCartToLocalStorage(cart);
};

function saveCartToLocalStorage(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
};

function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
};