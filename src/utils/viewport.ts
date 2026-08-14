/**
 * Viewport and device preset utilities for PremDevView.
 */

export interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
}

export const DEVICE_PRESETS: DevicePreset[] = [
  { id: 'small-android', name: 'Small Android', width: 360, height: 800 },
  { id: 'standard-android', name: 'Standard Android', width: 390, height: 844 },
  { id: 'large-android', name: 'Large Android', width: 412, height: 915 },
  { id: 'pixel', name: 'Pixel Style', width: 393, height: 852 },
  { id: 'custom', name: 'Custom', width: 390, height: 844 },
];

export const DEFAULT_PRESET = DEVICE_PRESETS[1]; // Standard Android

export interface ViewportDimensions {
  width: number;
  height: number;
}

/**
 * Swaps width and height for rotation.
 */
export function rotateDimensions(dims: ViewportDimensions): ViewportDimensions {
  return { width: dims.height, height: dims.width };
}

/**
 * Clamps a viewport dimension to reasonable bounds.
 */
export function clampDimension(value: number, min = 200, max = 2000): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Zoom level presets.
 */
export const ZOOM_LEVELS = [50, 75, 90, 100, 110, 125, 150];
export const DEFAULT_ZOOM = 100;
