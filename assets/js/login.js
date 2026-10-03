function iniciarSesion(event) {

    event.preventDefault();

    const correo =
        document.getElementById("login-correo").value.trim();

    const password =
        document.getElementById("login-password").value.trim();


    if (correo === "") {

        alert("Ingresa tu correo electrónico.");

        document.getElementById("login-correo").focus();

        return;
    }


    if (password === "") {

        alert("Ingresa tu contraseña.");

        document.getElementById("login-password").focus();

        return;
    }


    window.location.href = "sesion.html";
}

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("login-form");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const correo = document.getElementById("login-correo").value;
        const password = document.getElementById("login-password").value;

        if (correo === "" || password === "") {
            alert("Completa todos los campos.");
            return;
        }

        window.location.href = "sesion.html";

    });

});
