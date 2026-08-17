import { useState, useCallback } from 'react';
import {
  DEFAULT_PRESET,
  type DevicePreset,
  type ViewportDimensions,
} from '../utils/viewport';

export interface ViewportState {
  preset: DevicePreset;
  dimensions: ViewportDimensions;
  isLandscape: boolean;
}

export interface ViewportActions {
  toggleOrientation: () => void;
}

export function useViewport(): [ViewportState, ViewportActions] {
  const [isLandscape, setIsLandscape] = useState(false);

  const dimensions: ViewportDimensions = isLandscape 
    ? { width: DEFAULT_PRESET.height, height: DEFAULT_PRESET.width }
    : { width: DEFAULT_PRESET.width, height: DEFAULT_PRESET.height };

  const toggleOrientation = useCallback(() => {
    setIsLandscape((prev) => !prev);
  }, []);

  return [
    { preset: DEFAULT_PRESET, dimensions, isLandscape },
    { toggleOrientation },
  ];
}
