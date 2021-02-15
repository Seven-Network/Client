const { app, BrowserWindow, globalShortcut, clipboard } = require('electron');
const path = require('path');
const shortcut = require('electron-localshortcut');

const isDev = require('electron-is-dev');

app.commandLine.appendSwitch('high-dpi-support', 1);
app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('disable-accelerated-video-decode', false);
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-quic');
app.commandLine.appendSwitch('enable-pointer-lock-options');

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev,
      preload: path.join(__dirname, 'public', 'client.js'),
    },
  });

  win.loadFile('src/public/index.html');

  // Crashes app.commandLine.appendSwitch function somehow. Better use Shortcut for opening it
  //if (isDev) win.webContents.openDevTools();
  if (!isDev) win.removeMenu();

  shortcut.register(win, 'F1', () => {
    win.loadFile('src/public/index.html');
  });

  shortcut.register(win, 'F3', () => {
    var game = win.webContents.getURL().split('#').pop();
    var url = 'https://venge.io/#' + game;
    clipboard.writeText(url);
    win.webContents
      .executeJavaScript(
        'pc.app.fire("Chat:Message", "[rainbow]Seven-Client[/rainbow]", "Link copied!")'
      )
      .catch((e) => {});
  });

  shortcut.register(win, 'Alt+F4', () => {
    app.quit();
  });

  shortcut.register(win, 'F11', () => {
    win.setSimpleFullScreen(!win.isSimpleFullScreen());
  });

  shortcut.register(win, 'F12', () => {
    win.webContents.openDevTools();
  });

  win.webContents.on('will-prevent-unload', (event) => event.preventDefault());

  globalShortcut.register('ESC', () => {
    win.webContents.executeJavaScript(`document.exitPointerLock()`);
  });

  win.webContents.on('dom-ready', (event) => {
    win.setTitle(`Seven-Network-Client`);
    event.preventDefault();
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
