const { app, BrowserWindow, globalShortcut, clipboard, dialog } = require('electron');
const path = require('path');
const shortcut = require('electron-localshortcut');
const RPC = require('discord-rpc');

const isDev = require('electron-is-dev');

app.commandLine.appendSwitch('high-dpi-support', 1);
app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('disable-accelerated-video-decode', false);
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-quic');
app.commandLine.appendSwitch('enable-pointer-lock-options');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      preload: path.join(__dirname, 'public', 'client.js'),
    },
  });
  autoUpdater.checkForUpdatesAndNotify();

  win.loadFile('src/public/index.html');

  // Crashes app.commandLine.appendSwitch function somehow. Better use Shortcut for opening it
  //if (isDev) win.webContents.openDevTools();
  if (!isDev) win.removeMenu();

  shortcut.register(win, 'F1', () => {
    win.loadFile('src/public/index.html');
    autoUpdater.checkForUpdatesAndNotify();
  });

  shortcut.register(win, 'F2', () => {
    win.webContents.executeJavaScript('toggleJoinPanel()');
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
    win.setTitle(`Seven Network Client`);
    event.preventDefault();
  });
}

const rpc = new RPC.Client({
  transport: 'ipc',
});

rpc.on('ready', () => {
  rpc.setActivity({
    details: 'Currently playing',
    state: 'In Testing Phase',
    startTimestamp: new Date(),
    largeImageKey: 'logoclient',
    largeImageText: 'Stop touching our Logo ;)',
  });

  console.log('Rich presence should be now active');
});

rpc
  .login({
    clientId: '810864138837295125',
  })
  .catch((err) => {
    console.log(
      'Connection failed. Most likely is the user not running discord currently.'
    );
  });

  const { autoUpdater } = require('electron-updater');
  autoUpdater.logger = require('electron-log');
  autoUpdater.logger.transports.file.level = 'info';
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for updates...');
  });
  autoUpdater.on('update-available', (info) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Alright. I wait for the download to finish'],
      title: 'Seven Client Update',
      message: 'You have to download a update for our client!',
      detail:
        'Due to recent changes in our network. The client has to be updated to fit the latest update.',
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0)
        console.log('User saw New Version message');
        //Add later on some sort of download progress into client itself
        //win.webContents.openDevTools();
    });
  });
  autoUpdater.on('update-not-available', () => {
    console.log('Version is up-to-date');
  });
  autoUpdater.on('download-progress', (progressObj) => {
    console.log(
      `Download Speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.transferred} + '/ ${progressObj.total}`
    );
  });
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail:
        'Update has been downloaded. Press Restart to install it!',
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  });
  autoUpdater.on('error', (error) => {
    console.log(error);
  });

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
