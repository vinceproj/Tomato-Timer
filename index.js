const electron = require("electron");
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} = electron;

let mainWindow;

//Listen for launch
app.on("ready", () => {
  //Create new window
  mainWindow = new BrowserWindow({
    width: 600,
    height: 620,
    webPreferences: {
      nodeIntegration: true
    }
  });

  //Load index.html into window
  mainWindow.loadFile("src/index.html");

  //Quit app when closed
  mainWindow.on("closed", () => {
    app.quit();
  });

  //Reserve for setting main menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);
}); //End of launch function

//Reserve space for menu creation
const mainMenuTemplate = [{
  label: "Instructions",
  click() {
    createInstructionsWindow();
  }
}, {
  label: "Quit",
  accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
  click() {
    app.quit();
  }
}]

function createInstructionsWindow() {
  //Create New Window
  instructionsWindow = new BrowserWindow({
    width: 400,
    height: 500,
    title: "Instructions"
  });

  //Load HTML into Window
  instructionsWindow.loadFile("src/instructions.html")

  //Garbage Collection Handle
  instructionsWindow.on("closed", function () {
    addWindow = null;
  });
}