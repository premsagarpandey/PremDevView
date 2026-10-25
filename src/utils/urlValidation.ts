/**
 * URL validation and normalization utilities for PremDevView.
 * Provides resilient, forgiving parsing for localhost ports, local IPs, and web URLs.
 */

export interface ValidationResult {
  valid: boolean;
  url: string;
  error?: string;
}

/**
 * Validates and normalizes user input into a fully qualified URL.
 * Automatically formats port numbers, local IP addresses, and domain names.
 */
export function validateUrl(input: string): ValidationResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, url: '', error: 'Please enter a URL or port number.' };
  }

  let urlString = trimmed;

  // Handle leading colon port format: ":3000" or ":5173/page"
  if (/^:\d{2,5}(\/.*)?$/.test(urlString)) {
    urlString = `http://localhost${urlString}`;
  }
  // Handle raw port numbers: "3000", "5173", "5500/index.html"
  else if (/^\d{2,5}(\/.*)?$/.test(urlString)) {
    urlString = `http://localhost:${urlString}`;
  }
  // Handle 0.0.0.0 addresses: convert to localhost for browser compatibility
  else if (/^0\.0\.0\.0(:\d+)?(\/.*)?$/i.test(urlString)) {
    urlString = `http://${urlString.replace(/^0\.0\.0\.0/i, 'localhost')}`;
  }
  else if (/^https?:\/\/0\.0\.0\.0(:\d+)?(\/.*)?$/i.test(urlString)) {
    urlString = urlString.replace(/^(https?:\/\/)0\.0\.0\.0/i, '$1localhost');
  }
  // Handle localhost, 127.0.0.1, or private IPv4 without protocol
  else if (/^(localhost|127\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)(:\d+)?(\/.*)?$/i.test(urlString)) {
    urlString = `http://${urlString}`;
  }
  // Handle domains without protocol: default to https:// for modern secure embedding
  else if (!/^https?:\/\//i.test(urlString)) {
    urlString = `https://${urlString}`;
  }

  try {
    const parsed = new URL(urlString);

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return {
        valid: false,
        url: urlString,
        error: 'Please enter a valid URL starting with http:// or https://.',
      };
    }

    return { valid: true, url: parsed.href };
  } catch {
    return {
      valid: false,
      url: urlString,
      error: 'Please enter a valid URL or port number.',
    };
  }
}

/**
 * Checks if a URL points to a local machine or private network development environment.
 */
export function isLocalOrDevUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '[::1]' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.test') ||
      hostname.endsWith('.internal')
    ) {
      return true;
    }

    if (
      hostname.startsWith('127.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
    ) {
      return true;
    }

    if (parsed.protocol === 'http:' && parsed.port && parsed.port !== '80' && parsed.port !== '443') {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Formats a full URL for clean, concise display inside the smartphone address bar.
 * Removes internal cache-busting tokens and protocol prefixes.
 */
export function formatDisplayUrl(url: string): string {
  if (!url) return 'localhost';

  try {
    const cleanUrl = url.replace(/[?&]_pdv_r=\d+/, '');
    const parsed = new URL(cleanUrl);
    let display = parsed.host;
    if (parsed.pathname && parsed.pathname !== '/') {
      display += parsed.pathname;
    }
    return display;
  } catch {
    return url.replace(/^https?:\/\//i, '').replace(/[?&]_pdv_r=\d+/, '');
  }
}
