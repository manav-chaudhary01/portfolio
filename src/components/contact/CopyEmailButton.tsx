import React, { useState } from 'react';
import { Copy, Check, Mail, ExternalLink } from 'lucide-react';

interface CopyEmailButtonProps {
  email: string;
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({ email }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-surface border border-border-card shadow-xs">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
          <Mail size={18} />
        </div>
        <div className="min-w-0">
          <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
            Primary Email
          </span>
          <span className="font-mono text-sm sm:text-base font-medium text-ink-primary truncate block">
            {email}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-subtle shrink-0">
        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium font-sans transition-all active:scale-95 cursor-pointer border ${
            copied
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-surface hover:bg-surface-subtle text-ink-primary border-border-subtle shadow-2xs'
          }`}
          aria-label={copied ? 'Email address copied' : 'Copy email to clipboard'}
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-600" />
              <span>Copied! 📋</span>
            </>
          ) : (
            <>
              <Copy size={13} className="text-ink-muted" />
              <span>Copy Address</span>
            </>
          )}
        </button>

        {/* Direct Mailto Link */}
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-ink-primary text-surface hover:bg-ink-primary/90 text-xs font-medium font-sans transition-all active:scale-95 shadow-xs cursor-pointer"
          aria-label="Open mail client"
        >
          <span>Open Mail</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Screen Reader Live Announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard.' : ''}
      </div>
    </div>
  );
};
