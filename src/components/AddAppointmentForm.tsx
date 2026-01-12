import { useState, useEffect } from "react";
import type { Appointment } from "../types/appointment";
import { isAppointmentDirty } from "../domain/isDirty";
import { appointmentSchema } from "../validation/appointmentSchema";

type Props = {
  editingAppointment: Appointment | null;
  onAdd: (a: Appointment) => void;
  onUpdate: (a: Appointment) => void;
  onDirtyChange: (dirty: boolean) => void;
  isDirty: boolean;
};

type FormErrors = Partial<Record<keyof Appointment, string[]>>;

const AddAppointmentForm = ({
  onAdd,
  onUpdate,
  editingAppointment,
  onDirtyChange,
  isDirty,
}: Props) => {
  const clearFieldError = (field: keyof Appointment) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;

      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const [formData, setFormData] = useState<Appointment>(
    editingAppointment || { id: 0, date: "", type: "", notes: "" }
  );

  const [errors, setErrors] = useState<FormErrors>({});

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

    const candidate: Appointment = {
      ...formData,
      id: isEditing ? editingAppointment!.id : Date.now(),
    };

    const result = appointmentSchema.safeParse(candidate);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    if (isEditing) {
      onUpdate(result.data);
    } else {
      onAdd(result.data);
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
          onChange={(e) => {
            setFormData({ ...formData, date: e.target.value });
            setErrors((prev) => ({ ...prev, date: undefined }));
          }}
          className="p-2 border rounded"
        />
        {errors.date && (
          <p className="text-sm text-red-600">{errors.date[0]}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Typ</label>
        <input
          type="text"
          placeholder="z. B. U7, Impfung, Kontrolle ..."
          value={formData.type}
          onChange={(e) => {
            setFormData({ ...formData, type: e.target.value });
            clearFieldError("type");
          }}
          className="p-2 border rounded"
        />
        {errors.type && (
          <p className="text-sm text-red-600">{errors.type[0]}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Notizen</label>
        <textarea
          placeholder="Optional"
          value={formData.notes}
          onChange={(e) => {
            setFormData({ ...formData, notes: e.target.value });
            clearFieldError("notes");
          }}
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
