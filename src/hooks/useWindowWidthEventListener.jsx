import { useEffect } from 'react';

export function useWindowWidthEventListener(whatsDeviceUsed) {
  useEffect(() => {
    const handleWindowResize = () => {
      setTimeout(() => {
        if (window.innerWidth < 565) {
          whatsDeviceUsed('mobile');
        } else if (window.innerWidth > 565 && window.innerWidth < 864) {
          whatsDeviceUsed('tablet');
        } else {
          whatsDeviceUsed('desktop');
        }
      }, 3000);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
}
