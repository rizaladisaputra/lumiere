import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className={cn(
          'relative w-full bg-surface border border-outline-variant/30 p-6 sm:p-10 shadow-2xl z-10 transition-all duration-300',
          maxWidths[maxWidth]
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-outline hover:text-primary transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {title && (
          <div className="mb-6">
            {subtitle && (
              <p className="font-label text-[10px] tracking-[0.2em] text-outline uppercase mb-2">
                {subtitle}
              </p>
            )}
            <h3 className="font-headline text-2xl sm:text-3xl text-primary">{title}</h3>
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};
