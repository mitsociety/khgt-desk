const { app, BrowserWindow,screen } = require('electron');
const path = require('path');

function createWindow() {
    let factor = screen.getPrimaryDisplay().scaleFactor;
    let monSize = screen.getPrimaryDisplay().workAreaSize;
    const khgt = [360,480];
    const win = new BrowserWindow({
        width: khgt[0]/factor,
        height: khgt[1]/factor,
        //frame: false,
        //transparent: true,
        //titleBarStyle: 'hidden',
        //maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js')
        },
    });
    
    win.setPosition(monSize.width - khgt[0],0);
    //win.setIgnoreMouseEvents(true)

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
    
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
