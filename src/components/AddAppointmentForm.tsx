import { useState, useEffect } from "react";
import type { Appointment } from "../types/appointment";
import ConfirmModal from "./ConfirmModal";
import { isAppointmentDirty } from "../domain/isDirty";

type Props = {
  editingAppointment: Appointment | null;
  onAdd: (a: Appointment) => void;
  onUpdate: (a: Appointment) => void;
  onDirtyChange: (dirty: boolean) => void;
  isDirty: boolean;
};

const AddAppointmentForm = ({
  onAdd,
  onUpdate,
  editingAppointment,
  onDirtyChange,
  isDirty,
}: Props) => {
  const [formData, setFormData] = useState<Appointment>(
    editingAppointment || { id: 0, date: "", type: "", notes: "" }
  );

  useEffect(() => {
    if (!editingAppointment) {
      onDirtyChange(Boolean(formData.date || formData.type || formData.notes));
      return;
    }

    const dirty = isAppointmentDirty(editingAppointment, formData);

    onDirtyChange(dirty);
  }, [formData, editingAppointment, onDirtyChange]);

  const isEditing = editingAppointment !== null;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.date || !formData.type) return;

    const newAppointment: Appointment = {
      id: Date.now(),
      date: formData.date,
      type: formData.type,
      notes: formData.notes,
    };
    if (isEditing) {
      onUpdate({ ...newAppointment, id: editingAppointment!.id });
    } else {
      onAdd(newAppointment);
    }

    setFormData({ id: 0, date: "", type: "", notes: "" });
  };

  return (
    <form onSubmit={submit} className="space-y-4 bg-gray-100 p-4 rounded-lg">
      <div className="flex flex-col">
        <label className="text-sm font-medium">Datum</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="p-2 border rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Typ</label>
        <input
          type="text"
          placeholder="z. B. U7, Impfung, Kontrolle ..."
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="p-2 border rounded"
          required
        />
      </div>
      .
      <div className="flex flex-col">
        <label className="text-sm font-medium">Notizen</label>
        <textarea
          placeholder="Optional"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300
    disabled:text-gray-500
    disabled:cursor-not-allowed
    disabled:hover:bg-gray-300"
        disabled={!isDirty}
      >
        {isEditing ? "Änderungen speichern" : "Termin hinzufügen"}
      </button>
    </form>
  );
};

export default AddAppointmentForm;
