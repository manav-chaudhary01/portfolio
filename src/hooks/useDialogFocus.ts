import { useEffect, useRef, useCallback } from 'react';

interface UseDialogFocusOptions {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
  closeOnOutsideClick?: boolean;
  lockScroll?: boolean;
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Reusable hook for robust modal dialog accessibility:
 * 1. Initial focus placement
 * 2. Focus trapping (Tab & Shift+Tab cycle within dialog)
 * 3. Focus restoration to invoking control upon closing
 * 4. Escape-key dismissal
 * 5. Document-level outside-click & outside-touch dismissal
 * 6. Body scroll locking (configurable)
 */
export function useDialogFocus<T extends HTMLElement = HTMLDivElement>({
  isOpen,
  onClose,
  triggerRef,
  closeOnOutsideClick = true,
  lockScroll = true,
}: UseDialogFocusOptions) {
  const dialogRef = useRef<T>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Capture triggering active element on open & restore on close
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current =
        triggerRef?.current || (document.activeElement as HTMLElement | null);

      let originalOverflow = '';
      if (lockScroll) {
        originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }

      // Initial focus placement after animation frame
      const focusTimer = requestAnimationFrame(() => {
        if (!dialogRef.current) return;
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          dialogRef.current.focus();
        }
      });

      return () => {
        cancelAnimationFrame(focusTimer);
        if (lockScroll) {
          document.body.style.overflow = originalOverflow;
        }

        // Restore focus to triggering control
        if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
          previousActiveElementRef.current.focus();
        }
      };
    }
  }, [isOpen, triggerRef, lockScroll]);

  // Keyboard navigation: Escape key & Tab trapping
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !dialogRef.current) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Document-level outside-click & outside-touch listener
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;

    const handleOutside = (e: Event) => {
      const target = e.target as Node | null;
      if (!target) return;

      // Ignore clicks inside the dialog
      if (dialogRef.current && dialogRef.current.contains(target)) {
        return;
      }

      // Ignore clicks on the trigger button itself
      if (triggerRef?.current && triggerRef.current.contains(target)) {
        return;
      }

      onClose();
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleOutside);
      document.addEventListener('pointerdown', handleOutside);
      document.addEventListener('touchstart', handleOutside);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('pointerdown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [isOpen, closeOnOutsideClick, onClose, triggerRef]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (!closeOnOutsideClick) return;
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [closeOnOutsideClick, onClose]
  );

  return {
    dialogRef,
    handleBackdropClick,
  };
}
