import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  loadKeyboardData: () => ipcRenderer.invoke('load-keyboard-data'),
});