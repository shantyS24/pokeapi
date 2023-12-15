import session from './session.js';
/**
 * Extends the contact events.
*/
export default function (contact) {
    console.debug("CDEBUG >> ContactEvents - New Contact contactId: " + contact.contactId);
    console.debug("CDEBUG >> ContactEvents - New Contact InitialContactId(): " + contact.getInitialContactId());
    session.contact = contact;
    if (contact.getActiveInitialConnection()
        && contact.getActiveInitialConnection().getEndpoint()) {
        Swal.fire({
            title: "You have a call from the customer:" + contact.getQueue().name, //Tomamaos el nombre del Queue
            showCancelButton: false,
            confirmButtonText: "Cerrar",
            confirmButtonColor: "green",
        });
        console.debug("New contact is from " + contact.getActiveInitialConnection().getEndpoint().phoneNumber);//ACA ESTA EL NUMERO DEL CLIENTE
    } else {
        console.debug("This is an existing contact for this agent");
    }

    // Route to the respective handler
    contact.onIncoming(handleContactIncoming);
    contact.onAccepted(handleContactAccepted);
    contact.onConnecting(handleContactConnecting);
    contact.onConnected(handleContactConnected);
    contact.onEnded(handleContactEnded);
    contact.onDestroy(handleContactDestroyed);
    contact.onMissed(handleContactMissed);

    function handleContactIncoming(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactIncoming');
    }

    function handleContactAccepted(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactAccepted - Contact accepted by agent');
        // Add your custom code here
    }

    function handleContactConnecting(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactConnecting() - Contact connecting to agent');
        // Add your custom code here

    }

    function handleContactConnected(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactConnected() - Contact connected to agent');
        var queueBorrable = contact.getQueue().name;
        document.getElementById("QueueText").innerHTML = queueBorrable;
        var tiempoTranscurrido = 0;
        // Función para actualizar el cronómetro y mostrar mensajes cada 30 segundos
            // Función para actualizar el cronómetro
            function actualizarCronometro() {
                tiempoTranscurrido++;
                document.getElementById('mensaje').innerHTML = `Ha transcurrido ${tiempoTranscurrido} segundos`;
                // Verificar si ha pasado 30 segundos para mostrar un mensaje
                if (tiempoTranscurrido === 30) {
                    document.getElementById('mensaje1').innerHTML = 'Ha pasado 30 segundos';
                }
                // Verificar si ha pasado 1 minuto para mostrar otro mensaje
                if (tiempoTranscurrido === 60) {
                    document.getElementById('mensaje1').innerHTML = 'Ha pasado 1 minuto, ya parele ,mejor cuelgue';
                }
                if (tiempoTranscurrido === 90) {
                    document.getElementById('mensaje1').innerHTML = 'Ya paso 1 minuto con 30 segundos'; 
                }
                document.getElementById('mensaje2').innerHTML = 'Debe considerar transferir la llamada a 2nd line';
                document.getElementById('mensaje').innerHTML= ' ';
            }
            // Iniciar el intervalo para actualizar el cronómetro cada segundo
            const intervalo = setInterval(actualizarCronometro, 1000);

            // Detener el intervalo después de 2 minutos (120 segundos)
            setTimeout(() => {
                clearInterval(intervalo);
            }, 300000); // 300,000 milisegundos = 5 minutos
        
        contabilizarTiempo();
        // Iniciar la funció
    }

    function handleContactEnded(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactEnded() - Contact has ended successfully');
        // Add your custom code here
    }

    function handleContactDestroyed(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactDestroyed() - Contact will be destroyed');
        document.getElementById("QueueText").innerHTML = " ";
        document.getElementById('mensaje').innerHTML= ' ';
        document.getElementById('mensaje2').innerHTML= ' ';

        var msgsArray=  [
            "You did an excellent job handling that call!",
            "You were very patient with the customer. Great work!",
            "You really went above and beyond to help that customer.",
            "You have a great attitude and it shows in your work.",
            "You handled that call like a pro!",
            "You are a great listener and it shows in your work.", 
            "You are a valuable asset to our team.",
            "You are doing an amazing job!",
            "You are a great problem solver.",
            "You are a great communicator.",
            "You are very knowledgeable and it shows in your work.",
            "You are very professional and it shows in your work.",
            "You are very efficient and it shows in your work.",
            "You are very organized and it shows in your work.",
            "You are very detail-oriented and it shows in your work.",
            "You are very thorough and it shows in your work.",
            "You are very reliable and it shows in your work.",
            "You are very friendly and it shows in your work.",
            "You are very helpful and it shows in your work.",
            "You are very courteous and it shows in your work.",
            "You are very respectful and it shows in your work.",
            "You are very patient and it shows in your work.",
            "You are very understanding and it shows in your work.",
            "You are very empathetic and it shows in your work.",
            "You are very positive and it shows in your work."
        ];
        function randomMsgs() {
            var indice = Math.floor(Math.random() * msgsArray.length);
            return msgsArray[indice];
        }
        Swal.fire({
            title: randomMsgs(),
            icon: 'success',
            confirmButtonText: "Close",
            confirmButtonColor: "green",
        });
    }

    function handleContactMissed(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactMissed() - Contact was missed');
    
    }




}