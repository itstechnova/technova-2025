'use client';

import { useEffect } from 'react';

const CURRENT_VERSION = 'fix-infinite-loop-v1';

export default function ForceRefresh() {
  useEffect(() => {
    const storedVersion = localStorage.getItem('appVersion');
    if (storedVersion !== CURRENT_VERSION) {
      localStorage.setItem('appVersion', CURRENT_VERSION);
      window.location.reload();
    }
  }, []);

  return null; // This component renders nothing
}