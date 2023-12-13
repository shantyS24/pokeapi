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
                confirmButtonColor:"green",
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
    }

    function handleContactEnded(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactEnded() - Contact has ended successfully');
        // Add your custom code here
    }

    function handleContactDestroyed(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactDestroyed() - Contact will be destroyed');
        document.getElementById("QueueText").innerHTML = " ";
            const randomMessages = [];
            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * messages.length);
                randomMessages.push(messages[randomIndex]);
            }
    
            Swal.fire({
                title: "Random Messages",
                html: randomMessages.join("<br>"),
                showCancelButton: false,
                confirmButtonText: "Cerrar",
                confirmButtonColor: "green",
            });
            const messages = ["Message 1", "Message 2", "Message 3", "Message 4", "Message 5", "Message 6"];
            showRandomMessages(messages);

        }
    


    function handleContactMissed(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactMissed() - Contact was missed');
    }

}