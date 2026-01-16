import { useState } from "react";
import Modal from "./Modal";
import ConfirmModal from "./ConfirmModal";
import AddAppointmentForm from "./AddAppointmentForm";
import type { Appointment } from "../types/appointment";

type Props = {
  isOpen: boolean;
  editingAppointment: Appointment | null;
  onClose: () => void;
  onAdd: (a: Appointment) => void;
  onUpdate: (a: Appointment) => void;
};

const AppointmentModal = ({
  isOpen,
  editingAppointment,
  onClose,
  onAdd,
  onUpdate,
}: Props) => {
  const [isDirty, setIsDirty] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  const title = editingAppointment
    ? "Termin bearbeiten"
    : "Neuen Termin anlegen";

  const requestClose = () => {
    if (!isDirty) {
      onClose();
    } else {
      setShowDiscardConfirm(true);
    }
  };

  const confirmDiscard = () => {
    setShowDiscardConfirm(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen && !showDiscardConfirm}
        onRequestClose={requestClose}
        title={title}
      >
        <AddAppointmentForm
          editingAppointment={editingAppointment}
          onAdd={onAdd}
          onUpdate={onUpdate}
          isDirty={isDirty}
          onDirtyChange={setIsDirty}
          onCancel={requestClose}
        />
      </Modal>

      <ConfirmModal
        isOpen={showDiscardConfirm}
        title="Änderungen verwerfen?"
        description="Sie haben ungespeicherte Änderungen. Möchten Sie diese wirklich verwerfen?"
        confirmLabel="Verwerfen"
        confirmVariant="danger"
        onCancel={() => setShowDiscardConfirm(false)}
        onConfirm={confirmDiscard}
      />
    </>
  );
};

export default AppointmentModal;
