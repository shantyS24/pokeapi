import initializeCCP from './initCCP-CustomerProfiles.js';
import Swal from 'sweetalert2'
// or via CommonJS
const Swal = require('sweetalert2')
Swal.bindClickHandler();
/* Bind a mixin to a click handler */
Swal.mixin({
    toast: true
}).bindClickHandler("data-swal-toast-template");

// Add the call to init() as an onload so it will only run once the page is loaded
window.onload = (event) => {
    console.log("window.onload")

    try {
        initializeCCP('ccp-container');
    } catch (error) {
        console.error('CCP initialization error', error);
    }

};

