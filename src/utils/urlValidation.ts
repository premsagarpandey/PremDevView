/**
 * URL validation utilities for PremDevView.
 * Validates and normalizes user-entered URLs for iframe preview.
 */

export interface ValidationResult {
  valid: boolean;
  url: string;
  error?: string;
}

/**
 * Validates a URL string for use in the preview iframe.
 * Accepts http:// and https:// URLs, including localhost with ports.
 */
export function validateUrl(input: string): ValidationResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, url: '', error: 'Please enter a URL.' };
  }

  // Auto-prepend http:// if missing protocol but looks like localhost
  let urlString = trimmed;
  if (/^localhost(:\d+)?/.test(urlString)) {
    urlString = `http://${urlString}`;
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
      error: 'Please enter a valid URL.',
    };
  }
}

/**
 * Checks if a URL points to localhost.
 */
export function isLocalhostUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1' ||
      parsed.hostname === '[::1]'
    );
  } catch {
    return false;
  }
}
