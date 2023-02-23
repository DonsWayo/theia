/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/tslint/config */
const isRenderer = () => {
    // running in a web browser
    if (typeof process === 'undefined') { return false; }

    // node-integration is disabled
    if (!process) { return false; }

    // We're in node.js somehow
    if (!process['type']) { return false; }

    return process['type'] === 'renderer';
};

let ipc: any = undefined;

if (isRenderer()) {
    ipc = window['require']('electron').ipcRenderer;
}

export default () => ipc && ipc.send('ready');
