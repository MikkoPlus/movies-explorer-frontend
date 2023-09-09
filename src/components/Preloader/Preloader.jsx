import React from 'react';
import './Preloader.css';

const Preloader = ({ onlyLoader, isLoading }) => {
  const preloaderClass = `preloader${isLoading ? ' preloader_visible' : ''}`;
  const preloaderOverlayClass = `preloader-overlay${
    isLoading ? ' preloader-overlay_visible' : ''
  }`;
  return (
    <>
      {onlyLoader && (
        <div className={preloaderClass}>
          <div className='preloader__container'>
            <span className='preloader__round'></span>
          </div>
        </div>
      )}
      {!onlyLoader && (
        <div className={preloaderOverlayClass}>
          <div className={preloaderClass}>
            <div className='preloader__container'>
              <span className='preloader__round'></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Preloader;
