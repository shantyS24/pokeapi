import initializeCCP from './initCCP.js';
// Add the call to init() as an onload so it will only run once the page is loaded
window.onload = (event) => {
    console.log("window.onload")

    try {
        initializeCCP('container-div');
    } catch (error) {
        console.error('CCP initialization error', error);
    }

};
export function queueMsgsToScreen(msg){
    queueMsgs.innerHTML = '<div>' + new Date().toLocaleTimeString() + ' ' + msg + '</div>' + queueMsgs.innerHTML;
};
export function logInfoQueue2(queueMsgs) {
    connect.getLog().info(queueMsgs);
    queueMsgsToScreen(queueMsgs);
};