import React from "react";
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
  if (!isOpen) return null;

  const confirmStyles =
    confirmVariant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>

        {description && <p className="text-sm text-gray-600">{description}</p>}

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded">
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
