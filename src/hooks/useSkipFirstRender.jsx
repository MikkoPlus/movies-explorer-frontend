/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react';

export const useSkipFirstRender = (fn, args) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return fn();
    }
  }, args);

  useEffect(() => {
    isMounted.current = true;
  }, []);
};
