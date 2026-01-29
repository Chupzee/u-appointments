import { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  title?: string;
  role?: "dialog" | "alertdialog";
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Modal = ({
  isOpen,
  onRequestClose,
  children,
  title,
  role = "dialog",
}: Props) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    requestAnimationFrame(() => {
      const focusable =
        dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable) {
        focusable.focus();
      } else {
        dialogRef.current?.focus();
      }
    });

    return () => {
      previouslyFocusedElement.current?.focus();
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!dialogRef.current) return;

    if (e.key === "Escape") {
      e.preventDefault();
      onRequestClose();
      return;
    }

    if (e.key !== "Tab") return;

    e.preventDefault();

    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

    if (focusables.length === 0) {
      dialogRef.current.focus();
      return;
    }

    const current = document.activeElement as HTMLElement;
    const index = focusables.indexOf(current);

    let nextIndex;

    if (e.shiftKey) {
      nextIndex = index <= 0 ? focusables.length - 1 : index - 1;
    } else {
      nextIndex = index === focusables.length - 1 ? 0 : index + 1;
    }

    focusables[nextIndex].focus();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onRequestClose} />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role={role}
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        onKeyDownCapture={handleKeyDown}
        tabIndex={-1}
        className="relative bg-white rounded-lg p-6 z-10 min-w-[400px] outline-none"
      >
        {/* Title (optional but recommended) */}
        {title && (
          <h2 id="modal-title" className="text-lg font-semibold mb-4">
            {title}
          </h2>
        )}

        {/* Close button */}
        <button
          onClick={onRequestClose}
          aria-label="Close dialog"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
