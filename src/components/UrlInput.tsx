import { useState, useEffect, type FormEvent } from 'react';
import './UrlInput.css';

interface UrlInputProps {
  defaultUrl: string;
  onSubmit: (url: string) => void;
}

export function UrlInput({ defaultUrl, onSubmit }: UrlInputProps) {
  const [url, setUrl] = useState(defaultUrl || '');

  useEffect(() => {
    setUrl(defaultUrl || '');
  }, [defaultUrl]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form className="url-input-form" onSubmit={handleSubmit}>
      <label htmlFor="url-input" className="url-input-label">
        Enter your link here
      </label>
      <div className="url-input-group">
        <input
          id="url-input"
          type="text"
          className="url-input-field"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Please enter link"
          autoComplete="url"
          spellCheck={false}
          aria-label="Enter localhost or website URL"
        />
        <button type="submit" className="url-input-submit" aria-label="Open Mobile Preview">
          Open Mobile Preview
        </button>
      </div>
    </form>
  );
}
