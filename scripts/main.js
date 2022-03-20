const { app, BrowserWindow, BrowserView } = require('electron')



function createWindow () {

  const win = new BrowserWindow
  (
    { 

      webPreferences:
      {
        sandbox: true,
        devTools: false
      },
      width: 1200, height: 900,
      icon: "./img/icon.ico",
      title: "Gym Rat",
      autoHideMenuBar: true,
      
    }
    
  )
  win.loadFile('view/header.html')

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
