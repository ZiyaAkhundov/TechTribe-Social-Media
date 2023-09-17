import React, { useEffect, useState } from 'react';
import download from '../../../../assets/image/download.svg';

export default function DownloadApp() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  let beforeInstallPromptEvent;

  useEffect(() => {
    const installButton = document.getElementById('installApp');

    const beforeInstallHandler = (e) => {
      e.preventDefault();
      beforeInstallPromptEvent = e;
      // Only show the install button if the app isn't already installed
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setShowInstallButton(true);
      } else {
        setShowInstallButton(false); // App is already installed, so hide the install button
      }
    };

    const installButtonClickHandler = () => {
      if (beforeInstallPromptEvent) {
        beforeInstallPromptEvent.prompt();
        // Hide the install button after prompting for install
        setShowInstallButton(false);
      }
    };

    window.addEventListener('beforeinstallprompt', beforeInstallHandler);

    // Check if the installButton element exists before adding an event listener
    if (installButton) {
      installButton.addEventListener('click', installButtonClickHandler);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler);

      // Check if the installButton element exists before removing the event listener
      if (installButton) {
        installButton.removeEventListener('click', installButtonClickHandler);
      }
    };
  }, []);

  return (
    showInstallButton && (
      <div className="h-10 flex justify-center items-center flex-shrink-0 bg-slate-900 text-white rounded-sm mb-1 mx-1 cursor-pointer" id="installApp">
        <img src={download} className="h-4 mx-1" alt="" /> Download App
      </div>
    )
  );
}
