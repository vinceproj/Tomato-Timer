const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

//Listen for launch
app.on("ready", () => {
  //Create new window
  mainWindow = new BrowserWindow({
    width: 600,
    height: 620,
    resizable: false,
    webPreferences: { nodeIntegration: true }
  });

  //Load index.html into window
  mainWindow.loadFile("src/index.html");

  //Quit app when closed
  mainWindow.on("closed", () => {
    app.quit();
  });

  //Reserve for setting main menu
}); //End of launch function

//Reserve space for menu creation

//Reserve space for event listeners
