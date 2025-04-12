const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // Burayı ekledik
      nodeIntegration: false,  // Güvenlik için false yapıyoruz
      contextIsolation: true  // Güvenlik için true yapıyoruz
    }
  });

  win.loadFile(path.join(__dirname, '../dist/index.html'));
}
// 👈 Bu kapanış eksikti

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
