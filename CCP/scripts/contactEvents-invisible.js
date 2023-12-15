import session from './session.js';
import {logInfoMsg} from './index-invisible.js';
import {logInfoEvent} from './index-invisible.js';
import {logInfoQueue} from './index-invisible.js';
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
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Accept Call",
                confirmButtonColor:"green",
                denyButtonText: `Reject Call`
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire("Call accepted!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("You declined the call", "", "error");
                }
            });
        logInfoMsg("New contact is from " + contact.getActiveInitialConnection().getEndpoint().phoneNumber);//ACA ESTA EL NUMERO DEL CLIENTE
    } else {
        logInfoMsg("This is an existing contact for this agent");
    }
    logInfoMsg("Contact is from queue " + contact.getQueue().name);
    logInfoMsg("Contact attributes are " + JSON.stringify(contact.getAttributes()));

    // Route to the respective handler
    contact.onIncoming(handleContactIncoming);
    contact.onAccepted(handleContactAccepted);
    contact.onConnecting(handleContactConnecting);
    contact.onConnected(handleContactConnected);
    contact.onEnded(handleContactEnded);
    contact.onDestroy(handleContactDestroyed);

    function handleContactIncoming(contact) {//Esta funcion es para cuando esta entrando una llamada a los agentes
        console.debug('CDEBUG >> ContactEvents.handleContactIncoming');
        logInfoEvent("[contact.onIncoming] Contact is incoming");
        if (contact) {
            logInfoEvent("[contact.onIncoming] Contact is incoming. Contact state is " + contact.getStatus().type);
        } else {
            logInfoEvent("[contact.onIncoming] Contact is incoming. Null contact passed to event handler");
        }
    }

    function handleContactAccepted(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactAccepted - Contact accepted by agent');
        if (contact) {
            logInfoEvent("[contact.onAccepted] Contact accepted by agent. Contact state is " + contact.getStatus().type);
        } else {
            logInfoEvent("[contact.onAccepted] Contact accepted by agent. Null contact passed to event handler");
        }
    }

    function handleContactConnecting(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactConnecting() - Contact connecting to agent');
        logInfoEvent("[contact.onConnecting] Contact is connecting");
        if (contact) {
            logInfoEvent("[contact.onConnecting] Contact is connecting. Contact state is " + contact.getStatus().type);
            document.getElementById ('answerDiv').classList.add("glowingButton");
        } else {
            logInfoEvent("[contact.onConnecting] Contact is connecting. Null contact passed to event handler");
        }
    }

    function handleContactConnected(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactConnected() - Contact connected to agent');
        if (contact) {
            logInfoEvent("[contact.onConnected] Contact connected to agent. Contact state is " + contact.getStatus().type);
            document.getElementById ('answerDiv').classList.remove("glowingButton");
            document.getElementById ('hangupDiv').classList.add("glowingButton");

            logInfoQueue("Queue Name: " +contact.getQueue().name );
            var queueBorrable = contact.getQueue().name;
            document.getElementById("QueueText").innerHTML = queueBorrable;

            var tiempoTranscurrido = 0;
            // Función para actualizar el cronómetro y mostrar mensajes cada 30 segundos
            function actualizarCronometro() {
            // Incrementar el tiempo transcurrido
                tiempoTranscurrido++;
                // Actualizar el contenido del contenedor
                document.getElementById('cronometro').innerText = `Tiempo transcurrido: ${tiempoTranscurrido} segundos`;
                // Verificar si han pasado 30 segundos para mostrar un mensaje
                if (tiempoTranscurrido % 30 === 0) {
                    alert('Ha pasado 30 segundos');
                }
                // Verificar si ha pasado 1 minuto y 30 segundos para mostrar otro mensaje
                if (tiempoTranscurrido === 90) {
                    alert('Ha pasado 1 minuto y 30 segundos');
                }
            }

            // Simulación del evento cuando el contacto se conecta
            function contactoConectado() {
            // Iniciar el intervalo para actualizar el cronómetro cada segundo
                const intervalo = setInterval(actualizarCronometro, 1000);
                // Simulación de la desconexión del contacto después de 5 minutos (300 segundos)
                setTimeout(() => {
                    clearInterval(intervalo);
                    alert('El contacto se ha desconectado después de 5 minutos.');
                }, 30000); // 300,000 milisegundos = 5 minutos
            }
            // Simulación del evento cuando el contacto se conecta
            contactoConectado();

        } else {
            logInfoEvent("[contact.onConnected] Contact connected to agent. Null contact passed to event handler");
        }
    }

    function handleContactEnded(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactEnded() - Contact has ended successfully');
        if (contact) {
            logInfoEvent("[contact.onEnded] Contact has ended. Contact state is " + contact.getStatus().type);
            document.getElementById ('hangupDiv').classList.remove("glowingButton");
            document.getElementById ('clearDiv').classList.add("glowingButton");
        } else {
            logInfoEvent("[contact.onEnded] Contact has ended. Null contact passed to event handler");
        }
    }

    function handleContactDestroyed(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactDestroyed() - Contact will be destroyed');
        logInfoEvent("[contact.onDestroy] Contact is Destroyed");
        if (contact) {
            logInfoEvent("[contact.onDestroy] Contact is destroyed. Contact state is " + contact.getStatus().type);
            document.getElementById("QueueText").innerHTML = " ";
            document.getElementById ('clearDiv').classList.remove("glowingButton");
        } else {
            logInfoEvent("[contact.onDestroy] Contact is connecting. Null contact passed to event handler");
        }
    }


}
