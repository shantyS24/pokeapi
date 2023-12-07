import initializeCCP from './initCCP-CustomerProfiles.js';

// Add the call to init() as an onload so it will only run once the page is loaded
window.onload = (event) => {
    console.log("window.onload")
    try {
        initializeCCP('ccp-container');
    } catch (error) {
        console.error('CCP initialization error', error);
    }
};