/* The code is defining an object that models the session of an agent. It includes various properties
that store information about the agent's current session, such as the list of concurrent contacts,
the current routing profile being used, whether the routing profile file was loaded successfully,
the current queue used to populate the Disposition Codes box, the ID of the contact being viewed by
the agent in a multi-chat scenario, and the agent's information. */
/**
 * Model the Agent session. Every contact is loaded in the contacts map.
*/
export default {
    // List of concurrent contacts
    contacts: new Map(),
    // Current Routing profile used
    routingProfile: '',
    // Flag to identify if RO file was loaded successfully
    routingProfileFileLoaded: false,
    // Current Queue used to populate the Disposition Codes box
    currentQueueDPLoaded: '',
    // ID of contact that is being viewed by agent (Multi-chat scenario)
    currentContactID: '',
    agent: '',

}
