import { useEffect } from 'react';
import appFunctions from '../utils/functions.js';

export function useWindowWidthEventListener(whatsDeviceUsed) {
  useEffect(() => {
    const handleWindowResize = () => {
      setTimeout(() => {
        appFunctions.screenWidthQualifer(whatsDeviceUsed);
      }, 3000);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
}
