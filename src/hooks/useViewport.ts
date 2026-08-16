import { useState, useCallback } from 'react';
import {
  DEFAULT_PRESET,
  type DevicePreset,
  type ViewportDimensions,
} from '../utils/viewport';
import { useLocalStorage } from './useLocalStorage';

export interface ViewportState {
  preset: DevicePreset;
  dimensions: ViewportDimensions;
  isLandscape: boolean;
}

export interface ViewportActions {
  toggleOrientation: () => void;
}

export function useViewport(): [ViewportState, ViewportActions] {
  const [savedOrientation, setSavedOrientation] = useLocalStorage('landscape', false);
  const [isLandscape, setIsLandscape] = useState(savedOrientation);

  const dimensions: ViewportDimensions = isLandscape 
    ? { width: DEFAULT_PRESET.height, height: DEFAULT_PRESET.width }
    : { width: DEFAULT_PRESET.width, height: DEFAULT_PRESET.height };

  const toggleOrientation = useCallback(() => {
    setIsLandscape((prev) => {
      const next = !prev;
      setSavedOrientation(next);
      return next;
    });
  }, [setSavedOrientation]);

  return [
    { preset: DEFAULT_PRESET, dimensions, isLandscape },
    { toggleOrientation },
  ];
}
