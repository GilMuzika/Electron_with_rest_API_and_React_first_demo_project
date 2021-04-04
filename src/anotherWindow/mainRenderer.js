"use strict";
const { ipcRenderer } = require("electron");
const fs = require('fs');

//https://github.com/sindresorhus/devtools-detect
//restricted to rrenderer only!!!!!
//use the global 'window' object!
const devToolsDetect = require('devtools-detect');
const functionsLibrary = require('./functionsLibrary');
ipcRenderer.on('keyboard-shortcut-pressed', (e, data) => {
    let isOpenMessageStr = devToolsDetect.isOpen ? 'DevTools is Closed' : 'Open';
});


const placeGakeToken = document.getElementById('place-fake-token-dropdown-item_');

placeGakeToken.addEventListener('click', () => { 
    let textmessage = 'your fake token is placed';
    fs.readFile(`${__dirname}\\fakeToken.txt`, 'utf8', (err, data) => {
        debugger;
        localStorage.setItem('login-token', data);
        if(err != null)
            textmessage = err;
        alert(textmessage);
    });


});
