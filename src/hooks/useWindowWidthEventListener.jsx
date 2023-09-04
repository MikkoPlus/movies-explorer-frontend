import { useEffect } from 'react';

export function useWindowWidthEventListener(setIsMobileVersion) {
  useEffect(() => {
    const handleWindowResize = () => {
      setTimeout(() => {
        if (window.innerWidth < 470) {
          setIsMobileVersion(true);
        } else {
          setIsMobileVersion(false);
        }
      }, 3000);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
}
