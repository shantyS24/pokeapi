function contabilizarTiempo() {
    var tiempoTranscurrido = 0;
    document.getElementById('mensaje').innerHTML = 'Inicio del conteo';

    // Función para actualizar el cronómetro
    function actualizarCronometro() {
        tiempoTranscurrido++;
        // Verificar si ha pasado 1 minuto para mostrar un mensaje
        if (tiempoTranscurrido === 30) {
            document.getElementById('mensaje').innerHTML = 'Ha pasado 30 segundos';
        }
        // Verificar si han pasado 2 minutos para mostrar otro mensaje
        if (tiempoTranscurrido === 60) {
            document.getElementById('mensaje').innerHTML = 'Ha 1 minuto, ya parele ,mejor cuelgue';
        }
    }

    // Iniciar el intervalo para actualizar el cronómetro cada segundo
    const intervalo = setInterval(actualizarCronometro, 1000);

    // Detener el intervalo después de 2 minutos (120 segundos)
    setTimeout(() => {
        clearInterval(intervalo);
    }, 60000); // 120,000 milisegundos = 2 minutos
}

// Iniciar la función
contabilizarTiempo();