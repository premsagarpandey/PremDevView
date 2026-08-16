import { useState, useCallback, useRef, useEffect } from 'react';
import { validateUrl } from '../utils/urlValidation';
import { useLocalStorage } from './useLocalStorage';

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
  const [savedUrl, setSavedUrl] = useLocalStorage('lastUrl', '');
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
      setSavedUrl(result.url);
      setStatus('loading');
      setErrorType(null);
      setErrorMessage('');

      // Set a timeout to detect if the iframe fails to load
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
      loadTimeoutRef.current = setTimeout(() => {
        // If still loading after 15s, might be unreachable
        setStatus((prev) => {
          if (prev === 'loading') {
            return 'loading'; // Keep loading — iframe might still load
          }
          return prev;
        });
      }, 15000);
    },
    [setSavedUrl]
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
  const iframeSrc = currentUrl ? currentUrl : '';

  useEffect(() => {
    if (typeof window !== 'undefined' && status === 'idle' && !currentUrl) {
      if (savedUrl) {
        loadUrl(savedUrl);
      } else {
        loadUrl(window.location.origin);
      }
    }
  }, [savedUrl, currentUrl, status, loadUrl]);

  return [
    {
      url: savedUrl,
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
