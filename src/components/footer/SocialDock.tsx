import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SOCIAL_LINKS } from '../../data/socialLinks';
import { X, Mail, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';
import { springModal, springTactile } from '../../animations/presets';

interface SocialDockProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

/**
 * Expandable tactile social dock footer inspired by pixelwrld.co.
 * Initially shows a discrete 3-dot pill (...) that expands into an elevated
 * sheet dock with circular icon buttons.
 */
export const SocialDock: React.FC<SocialDockProps> = ({ isOpen, onToggle, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'mail':
        return <Mail size={18} />;
      case 'github':
        return <GithubIcon size={18} />;
      case 'file-text':
        return <FileText size={18} />;
      default:
        return <ArrowUpRight size={18} />;
    }
  };

  return (
    <footer className="w-full pt-8 pb-4 flex flex-col items-center select-none relative z-30">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Collapsed 3-Dot Pill Button */
          <motion.button
            key="collapsed-pill"
            type="button"
            onClick={onToggle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springTactile}
            className="px-4 py-2 bg-surface border border-border-subtle rounded-pill shadow-xs hover:shadow-tactile transition-all duration-200 cursor-pointer text-ink-secondary hover:text-ink-primary flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
            aria-label="Open contact and social links"
            aria-expanded="false"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ink-muted"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-ink-muted"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-ink-muted"></span>
          </motion.button>
        ) : (
          /* Expanded Social Dock Sheet (Pixelwrld Style) */
          <motion.div
            key="expanded-dock"
            role="dialog"
            aria-label="Social and contact links dock"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={springModal}
            className="w-full max-w-sm sm:max-w-md p-4 sm:p-5 bg-surface/95 backdrop-blur-md border border-border-subtle rounded-3xl shadow-dock flex flex-col items-center"
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between w-full mb-3 px-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                Connect & Collab
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-ink-muted hover:text-ink-primary p-1 rounded-full hover:bg-surface-subtle transition-colors cursor-pointer"
                aria-label="Close social dock"
              >
                <X size={16} />
              </button>
            </div>

            {/* Circular Action Icons */}
            <div className="flex items-center justify-around w-full py-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  download={link.download}
                  className="flex flex-col items-center gap-2 group p-2 rounded-2xl hover:bg-surface-subtle/80 transition-all duration-200"
                  aria-label={link.ariaLabel}
                >
                  <div className="w-11 h-11 rounded-full bg-surface-subtle group-hover:bg-ink-primary group-hover:text-surface text-ink-primary flex items-center justify-center transition-all duration-200 shadow-xs group-hover:scale-105">
                    {renderIcon(link.icon)}
                  </div>
                  <span className="text-xs font-medium text-ink-secondary group-hover:text-ink-primary transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Copyright & Location stamp */}
            <div className="text-[11px] text-ink-muted mt-3 pt-3 border-t border-border-subtle/60 w-full text-center">
              All Rights Reserved • Manav Chaudhary • {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
