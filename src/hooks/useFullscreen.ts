import { useState, useCallback, useRef } from 'react';

export interface FullscreenState {
  isFullscreen: boolean;
}

export interface FullscreenActions {
  toggleFullscreen: () => void;
  exitFullscreen: () => void;
  fullscreenContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function useFullscreen(): [FullscreenState, FullscreenActions] {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  return [
    { isFullscreen },
    { toggleFullscreen, exitFullscreen, fullscreenContainerRef },
  ];
}
