document.addEventListener('DOMContentLoaded', () => {
    const registrarseForm = document.querySelector("#registrarse");
    const ingresarForm = document.querySelector("#ingresar");

    class Usuario {
        constructor(nombre, telefono, email, nombreUsuario, contraseña) {
            this.nombre = nombre;
            this.telefono = telefono;
            this.email = email;
            this.nombreUsuario = nombreUsuario;
            this.contraseña = contraseña;
        }
    }

    function obtenerUsuarios() {
        const usuarios = localStorage.getItem("usuarios");
        return usuarios ? JSON.parse(usuarios) : [];
    }

    function guardarUsuarios(usuarios) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    function registrarUsuario(e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const nombreUsuario = document.getElementById("nuevoUsuario").value;
        const contraseña = document.getElementById("nuevoPassword").value;

        const usuarios = obtenerUsuarios();
        const nuevoUsuario = new Usuario(nombre, telefono, email, nombreUsuario, contraseña);
        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);

        Swal.fire("Usuario registrado con exito");
        registrarseForm.reset();
    }

    function iniciarSesion(e) {
        e.preventDefault();
        const nombreUsuario = document.getElementById("usuario").value;
        const contraseña = document.getElementById("pasword").value;

        const usuarios = obtenerUsuarios();
        const usuario = usuarios.find(user => user.nombreUsuario === nombreUsuario && user.contraseña === contraseña);

        if (usuario) {
            sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
            Swal.fire({
                icon: "success",
                title: "Sesion iniciada",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = "../pages/carrito.html";
            });
        } else { Swal.fire({
            icon: "error",
            title: "Usuario o contraseña incorrectos",
            showConfirmButton: false,
            timer: 1500
        });
        }
    }

    registrarseForm.addEventListener("submit", registrarUsuario);
    ingresarForm.addEventListener("submit", iniciarSesion);
});