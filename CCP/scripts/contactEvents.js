/**
 * Extends the contact events.
*/
export default function (contact) {
    console.debug("CDEBUG >> ContactEvents - New Contact contactId: " + contact.contactId);
    console.debug("CDEBUG >> ContactEvents - New Contact InitialContactId(): " + contact.getInitialContactId());

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
                // Extract attributes
                var contactAttr=contact.getAttributes()
                // Iterate attributes and populate the table
                try {
                    let tbody = document.getElementById("#attributes").getElementsByTagName('tbody')[0];
                        
                    Object.values(contactAttr).forEach((attribute) => {
                        let attrName = attribute.name;
                        let attrValue = attribute.value;
                        let tr = tbody.insertRow();
                        var td1 = tr.insertCell();
                        var td2 = tr.insertCell();
                        td1.innerHTML = attrName;
                        td2.innerHTML = attrValue;
                    })
                } catch (e) {
                    console.error("CDEBUG >> ContactEvents.handleContactConnecting() - Error!! ",e);
                }
        
    }

    function handleContactConnected(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactConnected() - Contact connected to agent');
    }

    function handleContactEnded(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactEnded() - Contact has ended successfully');
        // Add your custom code here
        // Delete Table
        let tableBody = document.getElementById("attributes").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = "";
    }

    function handleContactDestroyed(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactDestroyed() - Contact will be destroyed');
        // Add your custom code here
    }

    function handleContactMissed(contact) {
        console.debug('CDEBUG >> ContactEvents.handleContactMissed() - Contact was missed');
    }

}