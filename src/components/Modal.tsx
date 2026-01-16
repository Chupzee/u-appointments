import { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  title?: string;
  role?: "dialog" | "alertdialog";
};

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

    // Store previously focused element
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    // Focus first focusable element inside modal
    const focusable = dialogRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onRequestClose();
      }

      if (e.key === "Tab") {
        trapFocus(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Restore focus
      previouslyFocusedElement.current?.focus();
    };
  }, [isOpen, onRequestClose]);

  const trapFocus = (e: KeyboardEvent) => {
    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
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
