document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTOS
    ========================================= */

    const ticketWindow =
        document.getElementById("buy-ticket");

    const closeButton =
        document.getElementById("ticket-close");

    const nextButton =
        document.getElementById("ticket-next");

    const seats =
        document.querySelectorAll(".seat:not(.occupied)");

    const movieTitle =
        document.getElementById("ticket-movie");

    const movieInfo =
        document.getElementById("ticket-movie-info");

    const locationInfo =
        document.getElementById("ticket-location");

    const timeInfo =
        document.getElementById("ticket-time");

    const selectedSeatsElement =
        document.getElementById("selected-seats");

    const quantityElement =
        document.getElementById("ticket-quantity");

    const totalElement =
        document.getElementById("ticket-total");

    const ticketPriceElement =
        document.getElementById("ticket-price");


    /* =========================================
       ASIENTOS SELECCIONADOS
    ========================================= */

    let selectedSeats = [];


    /* =========================================
       PRECIO SEGÚN LA FILA
    ========================================= */

    function obtenerPrecio(asiento) {

        let fila = asiento.charAt(0);

        if (fila === "A" || fila === "B") {
            return 100;
        }

        if (fila === "C") {
            return 90;
        }

        if (fila === "D" || fila === "E") {
            return 80;
        }

        return 90;
    }


    /* =========================================
       BOTONES "COMPRAR BOLETO"
    ========================================= */

    const buyButtons =
        document.querySelectorAll(".buy-ticket-btn");


    buyButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const movie =
                this.dataset.movie;

            const location =
                this.dataset.location;

            const time =
                this.dataset.time;


            /* MOSTRAR DATOS */

            movieTitle.textContent =
                movie;

            movieInfo.textContent =
                movie;

            locationInfo.textContent =
                location;

            timeInfo.textContent =
                time;


            /* LIMPIAR SELECCIÓN */

            selectedSeats = [];

            seats.forEach(function (seat) {

                seat.classList.remove("selected");

            });


            updateTicketInfo();


            /* ABRIR VENTANA */

            ticketWindow.classList.add("active");


            /* SUBIR AL SELECTOR */

            ticketWindow.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       SELECCIONAR ASIENTO
    ========================================= */

    seats.forEach(function (seat) {

        seat.addEventListener("click", function () {

            const seatNumber =
                this.dataset.seat;


            /* SI YA ESTÁ SELECCIONADO */

            if (this.classList.contains("selected")) {

                this.classList.remove("selected");

                selectedSeats =
                    selectedSeats.filter(function (seat) {

                        return seat !== seatNumber;

                    });

            }


            /* SI NO ESTÁ SELECCIONADO */

            else {

                this.classList.add("selected");

                selectedSeats.push(seatNumber);

            }


            updateTicketInfo();

        });

    });


    /* =========================================
       ACTUALIZAR INFORMACIÓN
    ========================================= */

    function updateTicketInfo() {

        /* ORDENAR ASIENTOS */

        selectedSeats.sort();


        /* CANTIDAD */

        const quantity =
            selectedSeats.length;


        /* CALCULAR TOTAL */

        let total = 0;

        selectedSeats.forEach(function (seat) {

            total += obtenerPrecio(seat);

        });


        /* ASIENTOS */

        if (quantity === 0) {

            selectedSeatsElement.textContent =
                "Ninguno";

        } else {

            selectedSeatsElement.textContent =
                selectedSeats.join(", ");

        }


        /* CANTIDAD */

        quantityElement.textContent =
            quantity;


        /* TOTAL */

        totalElement.textContent =
            "$" + total;


        /* PRECIOS */

        if (quantity === 0) {

            ticketPriceElement.textContent =
                "Según asiento";

        } else {

            let precios = [];

            selectedSeats.forEach(function (seat) {

                precios.push(
                    seat + ": $" + obtenerPrecio(seat)
                );

            });

            ticketPriceElement.textContent =
                precios.join(" | ");

        }

    }


    /* =========================================
       CERRAR
    ========================================= */

    closeButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            ticketWindow.classList.remove("active");

        }
    );


    /* =========================================
       SIGUIENTE
    ========================================= */

    nextButton.addEventListener(
        "click",
        function () {

            if (selectedSeats.length === 0) {

                alert(
                    "Debes seleccionar al menos un asiento."
                );

                return;
            }


            const movie =
                movieInfo.textContent;

            const seatsSelected =
                selectedSeats.join(", ");

            const quantity =
                selectedSeats.length;


            /* CALCULAR TOTAL */

            let total = 0;

            selectedSeats.forEach(function (seat) {

                total += obtenerPrecio(seat);

            });


            alert(
                "¡Selección realizada!\n\n" +

                "Película: " +
                movie +

                "\nAsientos: " +
                seatsSelected +

                "\nCantidad: " +
                quantity +

                "\nTotal: $" +
                total
            );

        }
    );

});
