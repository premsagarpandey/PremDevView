import { useState, useCallback, useRef } from 'react';
import { validateUrl, isLocalOrDevUrl } from '../utils/urlValidation';

export type PreviewStatus = 'idle' | 'loading' | 'loaded' | 'error';
export type ErrorType = 'invalid-url' | 'connection' | 'iframe-blocked' | 'unknown';

export interface PreviewState {
  url: string;
  currentUrl: string;
  status: PreviewStatus;
  errorType: ErrorType | null;
  errorMessage: string;
}

export interface PreviewActions {
  loadUrl: (input: string) => void;
  onIframeLoad: () => void;
  onIframeError: () => void;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}

export function usePreview(): [PreviewState, PreviewActions] {
  const [currentUrl, setCurrentUrl] = useState('');
  const [status, setStatus] = useState<PreviewStatus>('idle');
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadUrl = useCallback(
    (input: string) => {
      const result = validateUrl(input);
      if (!result.valid) {
        setStatus('error');
        setErrorType('invalid-url');
        setErrorMessage(result.error || 'Please enter a valid URL.');
        return;
      }

      setCurrentUrl(result.url);
      setStatus('loading');
      setErrorType(null);
      setErrorMessage('');

      // Set a timeout to detect if the iframe fails to load or is taking too long
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
      loadTimeoutRef.current = setTimeout(() => {
        // Force the iframe to become visible after 3 seconds.
        // If the local server isn't running, this allows the user to see the browser's native 'Connection Refused' error.
        setStatus((prev) => {
          if (prev === 'loading') {
            return 'loaded'; 
          }
          return prev;
        });
      }, 3000);
    },
    []
  );



  const onIframeLoad = useCallback(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    if (currentUrl) {
      setStatus('loaded');
    }
  }, [currentUrl]);

  const onIframeError = useCallback(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    setStatus('error');
    setErrorType('iframe-blocked');
    setErrorMessage("This website's security policy prevents embedded previews.");
  }, []);

  // Derive the iframe src — append reload key to force refresh
  let iframeSrc = currentUrl ? currentUrl : '';
  
  // To fulfill the requirement of previewing ANY link (including those that block iframes via X-Frame-Options),
  // we route external links through a public CORS proxy.
  // HOWEVER, we MUST NOT proxy local/dev environments (like 192.168.x.x or custom dev ports) 
  // because public proxies cannot access private networks.
  if (iframeSrc && !isLocalOrDevUrl(iframeSrc)) {
    // Using corsproxy.io to strip X-Frame-Options headers for external sites
    iframeSrc = `https://corsproxy.io/?${encodeURIComponent(iframeSrc)}`;
  }

  // Note: On initial load and every browser refresh, we start completely fresh:
  // url is '', status is 'idle', phone screen shows EmptyState, input shows placeholder.

  return [
    {
      url: currentUrl,
      currentUrl: iframeSrc,
      status,
      errorType,
      errorMessage,
    },
    {
      loadUrl,
      onIframeLoad,
      onIframeError,
      iframeRef,
    },
  ];
}
