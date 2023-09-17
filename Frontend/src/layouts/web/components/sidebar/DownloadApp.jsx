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
      setShowInstallButton(true);
    };

    const installButtonClickHandler = () => {
      if (beforeInstallPromptEvent) {
        beforeInstallPromptEvent.prompt();
      }
    };

    window.addEventListener('beforeinstallprompt', beforeInstallHandler);
    installButton.addEventListener('click', installButtonClickHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
      installButton.removeEventListener('click', installButtonClickHandler);
    };
  }, []);

  return (
    <div>
      {showInstallButton ? (
        <div
          className="h-10 flex justify-center items-center flex-shrink-0 bg-slate-900 text-white rounded-sm mb-1 mx-1 cursor-pointer"
          id="installApp"
        >
          <img src={download} className="h-4 mx-1" alt="" /> Download App
        </div>
      ) : (
        <p>Your PWA is installed!</p>
      )}
    </div>
  );
}
