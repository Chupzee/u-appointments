import { useEffect, useRef } from "react";
import Modal from "./Modal";

type Props = {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  confirmVariant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmLabel = "Bestätigen",
  confirmVariant = "primary",
  onConfirm,
  onCancel,
}: Props) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the safe action by default
      cancelButtonRef.current?.focus();
    }
  }, [isOpen]);

  const confirmStyles =
    confirmVariant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      title={title}
      role="alertdialog"
    >
      <div className="space-y-4">
        {/* The title is already rendered by Modal */}

        {description && (
          <p className="text-sm text-gray-600" id="confirm-description">
            {description}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            ref={cancelButtonRef}
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Abbrechen
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded ${confirmStyles}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
