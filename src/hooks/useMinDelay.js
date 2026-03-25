import { useState, useEffect } from 'react';

export default function useMinDelay(isLoading, minMs = 1200) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const t = setTimeout(() => setShow(false), minMs);
      return () => clearTimeout(t);
    } else {
      setShow(true);
    }
  }, [isLoading, minMs]);

  return show;
}
