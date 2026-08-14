/**
 * Localhost port detection utility for PremDevView.
 * Attempts to detect running local development servers on common ports.
 * 
 * IMPORTANT: Browser security restrictions may prevent reliable detection
 * of localhost servers from a hosted web page. This utility uses fetch
 * with a short timeout as a best-effort approach.
 */

export interface PortResult {
  port: number;
  url: string;
  available: boolean;
  error?: string;
}

export const COMMON_PORTS = [3000, 4173, 5000, 5173, 5500, 8000, 8080];

/**
 * Attempts to detect if a localhost port is responding.
 * Uses fetch with a short timeout. Results may be unreliable due to
 * browser security restrictions (CORS, mixed content, etc).
 */
async function checkPort(port: number, timeoutMs = 3000): Promise<PortResult> {
  const url = `http://localhost:${port}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    // In no-cors mode, we get an opaque response (status 0) if the server is running
    // This is actually a successful signal — the server responded
    if (response.type === 'opaque' || response.ok) {
      return { port, url, available: true };
    }
    return { port, url, available: true };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof DOMException && err.name === 'AbortError') {
      return { port, url, available: false, error: 'Timeout' };
    }
    return { port, url, available: false, error: 'Not reachable' };
  }
}

/**
 * Scans all common localhost ports for running development servers.
 * Runs checks in parallel for speed.
 * 
 * Note: Results are best-effort. Browser security policies may
 * prevent accurate detection of some servers.
 */
export async function scanCommonPorts(
  onProgress?: (result: PortResult) => void
): Promise<PortResult[]> {
  const promises = COMMON_PORTS.map(async (port) => {
    const result = await checkPort(port);
    onProgress?.(result);
    return result;
  });

  return Promise.all(promises);
}
