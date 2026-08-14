import { useState, useCallback } from 'react';
import {
  DEVICE_PRESETS,
  DEFAULT_PRESET,
  type DevicePreset,
  type ViewportDimensions,
  clampDimension,
} from '../utils/viewport';
import { useLocalStorage } from './useLocalStorage';

export interface ViewportState {
  preset: DevicePreset;
  dimensions: ViewportDimensions;
  isLandscape: boolean;
  customWidth: number;
  customHeight: number;
}

export interface ViewportActions {
  selectPreset: (presetId: string) => void;
  setCustomDimensions: (width: number, height: number) => void;
  toggleOrientation: () => void;
}

export function useViewport(): [ViewportState, ViewportActions] {
  const [savedDevice, setSavedDevice] = useLocalStorage('device', DEFAULT_PRESET.id);
  const [savedOrientation, setSavedOrientation] = useLocalStorage('landscape', false);

  const initialPreset =
    DEVICE_PRESETS.find((p) => p.id === savedDevice) || DEFAULT_PRESET;

  const [preset, setPreset] = useState<DevicePreset>(initialPreset);
  const [isLandscape, setIsLandscape] = useState(savedOrientation);
  const [customWidth, setCustomWidth] = useState(initialPreset.width);
  const [customHeight, setCustomHeight] = useState(initialPreset.height);

  const getDimensions = useCallback(
    (p: DevicePreset, landscape: boolean, cw: number, ch: number): ViewportDimensions => {
      const w = p.id === 'custom' ? cw : p.width;
      const h = p.id === 'custom' ? ch : p.height;
      return landscape ? { width: h, height: w } : { width: w, height: h };
    },
    []
  );

  const dimensions = getDimensions(preset, isLandscape, customWidth, customHeight);

  const selectPreset = useCallback(
    (presetId: string) => {
      const found = DEVICE_PRESETS.find((p) => p.id === presetId);
      if (found) {
        setPreset(found);
        setSavedDevice(found.id);
        if (found.id !== 'custom') {
          setCustomWidth(found.width);
          setCustomHeight(found.height);
        }
      }
    },
    [setSavedDevice]
  );

  const setCustomDimensions = useCallback(
    (width: number, height: number) => {
      const cw = clampDimension(width);
      const ch = clampDimension(height);
      setCustomWidth(cw);
      setCustomHeight(ch);
      // Auto-switch to custom preset
      const customPreset = DEVICE_PRESETS.find((p) => p.id === 'custom')!;
      setPreset({ ...customPreset, width: cw, height: ch });
      setSavedDevice('custom');
    },
    [setSavedDevice]
  );

  const toggleOrientation = useCallback(() => {
    setIsLandscape((prev) => {
      const next = !prev;
      setSavedOrientation(next);
      return next;
    });
  }, [setSavedOrientation]);

  return [
    { preset, dimensions, isLandscape, customWidth, customHeight },
    { selectPreset, setCustomDimensions, toggleOrientation },
  ];
}
