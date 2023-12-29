const { app, BrowserWindow } = require('electron');

// Application configuration
const appConfig = {
  homePageURL: 'https://robotics-sensors.github.io',
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.3',
};

console.log(`Using user agent: ${appConfig.userAgent}`);
console.log(`Process arguments: ${process.argv}`);

// Configure Electron command line switches
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder,WaylandWindowDecorations,RawDraw');
app.commandLine.appendSwitch('disable-features', 'UseChromeOSDirectVideoDecoder');
app.commandLine.appendSwitch('enable-accelerated-mjpeg-decode');

// Create the main application window
async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    fullscreenable: true,
    webPreferences: {
      contextIsolation: false,
      userAgent: appConfig.userAgent,
    },
  });

  await mainWindow.loadURL(appConfig.homePageURL);
  return mainWindow;
}

// Initialize the application
app.whenReady().then(async () => {
  await createMainWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createMainWindow();
    }
  });

  // Quit the application when all windows are closed
  app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});
