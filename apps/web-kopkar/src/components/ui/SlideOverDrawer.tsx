import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface SlideOverDrawerProps {
  open: boolean;
  onClose: () => void;
  maxWidthClass?: string;
  closeAriaLabel?: string;
  header: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * SlideOverDrawer — Shared right slide-over drawer rendered in document.body portal.
 */
export const SlideOverDrawer: React.FC<SlideOverDrawerProps> = ({
  open,
  onClose,
  maxWidthClass = 'sm:max-w-[430px]',
  closeAriaLabel = 'Tutup panel',
  header,
  footer,
  children,
}) => {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <aside
        className={`w-full max-w-none ${maxWidthClass} bg-white h-[100dvh] shadow-2xl sm:border-l border-[#EAE4D3] flex flex-col justify-between p-4 sm:p-6 overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">{header}</div>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeAriaLabel}
              className="p-1.5 rounded-lg text-[#7A867E] hover:text-[#18221D] hover:bg-[#FAF7EE] cursor-pointer transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {children}
        </div>

        {footer && (
          <div className="pt-4 mt-6 border-t border-[#F0EBDC]">{footer}</div>
        )}
      </aside>
    </div>,
    document.body
  );
};
