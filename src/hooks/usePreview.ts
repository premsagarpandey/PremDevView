import { useState, useCallback, useRef } from 'react';
import { validateUrl } from '../utils/urlValidation';

export type PreviewStatus = 'idle' | 'loading' | 'loaded' | 'error';
export type ErrorType = 'invalid-url' | 'connection' | 'iframe-blocked' | 'unknown';

export interface PreviewState {
  url: string;
  currentUrl: string;
  status: PreviewStatus;
  errorType: ErrorType | null;
  errorMessage: string;
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface PreviewActions {
  loadUrl: (input: string) => void;
  reload: () => void;
  goBack: () => void;
  goForward: () => void;
  onIframeLoad: () => void;
  onIframeError: () => void;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}

export function usePreview(): [PreviewState, PreviewActions] {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [status, setStatus] = useState<PreviewStatus>('idle');
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeUrl = historyIndex >= 0 && historyIndex < history.length ? history[historyIndex] : '';

  const loadUrl = useCallback((input: string) => {
    const result = validateUrl(input);
    if (!result.valid) {
      setStatus('error');
      setErrorType('invalid-url');
      setErrorMessage(result.error || 'Please enter a valid URL.');
      return;
    }

    const targetUrl = result.url;
    setHistory((prev) => {
      // Truncate forward history if navigating from an earlier point
      const nextHistory = prev.slice(0, historyIndex + 1);
      nextHistory.push(targetUrl);
      return nextHistory;
    });
    setHistoryIndex((prev) => prev + 1);

    setStatus('loading');
    setErrorType(null);
    setErrorMessage('');
    setReloadKey(Date.now());

    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    loadTimeoutRef.current = setTimeout(() => {
      setStatus((prev) => (prev === 'loading' ? 'loaded' : prev));
    }, 4000);
  }, [historyIndex]);

  const reload = useCallback(() => {
    if (!activeUrl) return;

    setStatus('loading');
    setErrorType(null);
    setErrorMessage('');
    setReloadKey(Date.now());

    // Try native reload on same-origin iframe if possible
    try {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.location.reload();
      }
    } catch {
      // Cross-origin fallback: reloadKey in src will force reload
    }

    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    loadTimeoutRef.current = setTimeout(() => {
      setStatus((prev) => (prev === 'loading' ? 'loaded' : prev));
    }, 4000);
  }, [activeUrl]);

  const goBack = useCallback(() => {
    // Attempt iframe cross-origin navigation first
    let navigatedInternally = false;
    try {
      if (iframeRef.current?.contentWindow?.history) {
        iframeRef.current.contentWindow.history.back();
        navigatedInternally = true;
      }
    } catch {
      navigatedInternally = false;
    }

    // If internal navigation couldn't be confirmed or history index exists, fall back to history stack
    if (!navigatedInternally && historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setStatus('loading');
      setReloadKey(Date.now());
    }
  }, [historyIndex]);

  const goForward = useCallback(() => {
    let navigatedInternally = false;
    try {
      if (iframeRef.current?.contentWindow?.history) {
        iframeRef.current.contentWindow.history.forward();
        navigatedInternally = true;
      }
    } catch {
      navigatedInternally = false;
    }

    if (!navigatedInternally && historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setStatus('loading');
      setReloadKey(Date.now());
    }
  }, [historyIndex, history.length]);

  const onIframeLoad = useCallback(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    if (activeUrl) {
      setStatus('loaded');
    }
  }, [activeUrl]);

  const onIframeError = useCallback(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    setStatus('error');
    setErrorType('iframe-blocked');
    setErrorMessage("This website's security policy prevents embedded previews.");
  }, []);

  // Compute final iframe URL with reload key
  const iframeSrc = activeUrl
    ? `${activeUrl}${activeUrl.includes('?') ? '&' : '?'}_pdv_r=${reloadKey}`
    : '';

  return [
    {
      url: activeUrl,
      currentUrl: iframeSrc,
      status,
      errorType,
      errorMessage,
      canGoBack: historyIndex > 0,
      canGoForward: historyIndex < history.length - 1,
    },
    {
      loadUrl,
      reload,
      goBack,
      goForward,
      onIframeLoad,
      onIframeError,
      iframeRef,
    },
  ];
}
