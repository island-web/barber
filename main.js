//********************************************************************************************* */
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

//********************************************************************************************* */




//CREATE GLOBAL & MODAL WINDOWS
function createWindow() {
  //GLOBAL WINDOW
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: true,
    kiosk: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  const modal_login = new BrowserWindow({
    parent: mainWindow,
    width: 380,
    height: 420,
    frame: false,
    kiosk: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })


  modal_login.loadFile(`login.html`)
  mainWindow.loadFile('index.html')
  
  mainWindow.webContents.openDevTools()
  modal_login.webContents.openDevTools()


  //********************************************************************************************* */
  ipcMain.once("login", (event, args) => { modal_login.show() })
  ipcMain.once("close_login", (event, args) => { modal_login.close() })
  ipcMain.on("reload_login", (event, args) => { modal_login.reload() })
  ipcMain.on("reload", (event, args) => { mainWindow.reload() })
  ipcMain.on("start", (event, args) => { mainWindow.show() })

  //ipcMain.on("modal_error", (event, args) => { modal_error.show() })
  //ipcMain.on("modal_error_close", (event, args) => { modal_error.close() })



}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  app.quit()
})