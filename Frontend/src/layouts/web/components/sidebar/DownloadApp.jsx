import React from 'react'
import download from '../../../../assets/image/download.svg'
export default function DownloadApp() {
  const installButton = document.getElementById('install-app');
  if(installButton){
    let beforeInstallPromptEvent
    window.addEventListener("beforeinstallprompt", function(e) {
        e.preventDefault();
        beforeInstallPromptEvent = e
        installButton.style.display = 'flex'
        installButton.addEventListener("click", function() {
            e.prompt();
        });
        installButton.hidden = false;
    });
    installButton.addEventListener("click", function() {
        beforeInstallPromptEvent.prompt();
    });
  }
  return (
    <div className='h-10 flex justify-center items-center flex-shrink-0 bg-slate-900 text-white rounded-sm mb-1 mx-1 cursor-pointer' id='install-app'>
       <img src={download} className='h-4 mx-1' alt="" /> Download App
    </div>
  )
}
