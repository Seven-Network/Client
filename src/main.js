const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev,
      preload: path.join(__dirname, 'public', 'client.js'),
    },
  });

  win.loadFile('src/public/index.html');

  if (isDev) win.webContents.openDevTools();

  win.webContents.on('will-prevent-unload', (event) => event.preventDefault());

  globalShortcut.register('ESC', () => {
    win.webContents.executeJavaScript(`document.exitPointerLock()`);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
