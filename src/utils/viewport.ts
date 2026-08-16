/**
 * Viewport and device preset utilities for PremDevView.
 */

export interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
}

export const DEFAULT_PRESET: DevicePreset = { id: 'standard-android', name: 'Standard Android', width: 390, height: 844 };

export interface ViewportDimensions {
  width: number;
  height: number;
}


