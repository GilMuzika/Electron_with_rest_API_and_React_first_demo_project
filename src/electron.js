//instruction:
//https://medium.com/bobble-engineering/create-a-desktop-app-using-electron-and-react-b23b435c0506
/*
"foreman" is process manager for node, 
*/

const { app, BrowserWindow, globalShortcut, ipcMain, clipboard, screen } = require('electron');
const windowStateKeeper = require('electron-window-state');





  let primaryDisplay;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow()  {

    let state = windowStateKeeper({
        defaultWidth: primaryDisplay.workArea.width,
        defaultHeight: primaryDisplay.workArea.height
      });

    mainWindow = new BrowserWindow({
        x: state.x, y: state.y,
        width: state.width, height: state.height,
        minWidth: 350, 
        maxWidth: primaryDisplay.workArea.width,
        minHeight: 300,
        maxHeight: primaryDisplay.workArea.height,
        webPreferences: { nodeIntegration: true },
        show: false
      })

      mainWindow.loadURL('http://localhost:5000');

      //manage the window state with state keeper
        state.manage(mainWindow);

        // Listen for window being closed
        mainWindow.on('closed',  () => {
            mainWindow = null
        })

        

        mainWindow.once('ready-to-show', mainWindow.show);

}//End of CreateWindow function

// Electron `app` is ready
app.on('ready', () => { 
	primaryDisplay = screen.getPrimaryDisplay();
  createWindow();

});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })





let toggleDevToolsShortcutStr = 'CommandOrControl+Shift+D';
app.whenReady().then(() => {
	// Register a 'CommandOrControl+Shift+D' shortcut listener.
	const ret = globalShortcut.register(toggleDevToolsShortcutStr, () => {
		mainWindow.toggleDevTools();
		//mainWindow.webContents.send('keyboard-shortcut-pressed');
	})

	if (!ret) {
		console.log('registration of keyboard shortcut failed')
	}

	// Check whether a shortcut is registered.
	//console.log(globalShortcut.isRegistered(toggleDevToolsShortcutStr))
})

