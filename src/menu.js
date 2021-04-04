const { Menu, BrowserWindow, app, shell } = require('electron');
const windowStateKeeper = require('electron-window-state');
const fs = require('fs');

exports.menuPrimaryDisplay;
let anotherWindow;

let openAnotherWindow = () => {
debugger;
    let state = windowStateKeeper({
        defaultWidth: this.menuPrimaryDisplay.workArea.width,
        defaultHeight: this.menuPrimaryDisplay.workArea.height
      });

      anotherWindow = new BrowserWindow({
        x: state.x, y: state.y,
        width: state.width, height: state.height,
        minWidth: 350, 
        maxWidth: this.menuPrimaryDisplay.workArea.width,
        minHeight: 300,
        maxHeight: this.menuPrimaryDisplay.workArea.height,
        webPreferences: { 
            nodeIntegration: true,
            contextIsolation: false
         },
        show: false
      })

     debugger;
     let anotherWindowRendererPath = `${__dirname}\\anotherWindow\\index.html`;
      anotherWindow.loadURL(anotherWindowRendererPath);

      //manage the window state with state keeper
        state.manage(anotherWindow);
        // Listen for window being closed
        anotherWindow.on('closed',  () => {
            anotherWindow = null
        })


        anotherWindow.once('ready-to-show', () => {

            // Open DevTools - Remove for PRODUCTION!
            anotherWindow.webContents.openDevTools();
            anotherWindow.show();
        });
};



exports.setMenu = () => {

//Menu template
template = [
    {
        label: '&More functionality',
        click: openAnotherWindow
    },
    {
        role: 'editMenu',
    }, 
    {
        role: 'windowMenu'
    },
    {
        role: 'appMenu'
    },
    {
        label: '&Help',
        role: 'help',
        submenu: [{
            label: '&Git repository',
            click: () => {
                debugger;
                    fs.readFile(`${__dirname}\\anotherWindow\\config.txt`, 'utf8', (err, data) => {
                        debugger;
                        let configObj = JSON.parse(data);
                        shell.openExternal(configObj.aboutTheApp);
                    });
            }
        }]
    }
];

//creATE MAC APP MENU
//process.platform -> 'win32' or 'win64' for Windows, 'linux' for Linux, amd 'darwin' for Mac
if(process.platform === 'darwin')
        template.unshift({role: 'appMenu'}); //unshift is add element to the beginning of the array


//Build menu from template
let menu = Menu.buildFromTemplate(template);
    
Menu.setApplicationMenu(menu);


};


