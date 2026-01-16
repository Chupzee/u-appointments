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
  onCancel: () => void;
};

type FormErrors = Partial<Record<keyof Appointment, string[]>>;

const EMPTY_APPOINTMENT: Appointment = {
  id: 0,
  date: "",
  type: "",
  notes: "",
};

const AddAppointmentForm = ({
  onAdd,
  onUpdate,
  editingAppointment,
  onDirtyChange,
  isDirty,
  onCancel,
}: Props) => {
  const [formData, setFormData] = useState<Appointment>(
    editingAppointment ?? EMPTY_APPOINTMENT
  );

  const [errors, setErrors] = useState<FormErrors>({});

  // 🔁 Sync form when editing target changes
  useEffect(() => {
    setFormData(editingAppointment ?? EMPTY_APPOINTMENT);
    setErrors({});
    onDirtyChange(false);
  }, [editingAppointment, onDirtyChange]);

  // 🔍 Dirty tracking
  useEffect(() => {
    if (!editingAppointment) {
      onDirtyChange(Boolean(formData.date || formData.type || formData.notes));
      return;
    }

    const dirty = isAppointmentDirty(editingAppointment, formData);
    onDirtyChange(dirty);
  }, [formData, editingAppointment, onDirtyChange]);

  const isEditing = editingAppointment !== null;

  const clearFieldError = (field: keyof Appointment) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

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

    setFormData(EMPTY_APPOINTMENT);
    onDirtyChange(false);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 bg-gray-100 p-4 rounded-lg"
      noValidate
    >
      {/* 📅 DATE */}
      <div className="flex flex-col">
        <label htmlFor="date" className="text-sm font-medium">
          Datum
        </label>
        <input
          id="date"
          type="date"
          value={formData.date}
          aria-required="true"
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "date-error" : undefined}
          onChange={(e) => {
            setFormData({ ...formData, date: e.target.value });
            clearFieldError("date");
          }}
          className="p-2 border rounded"
        />
        {errors.date && (
          <p id="date-error" className="text-sm text-red-600">
            {errors.date[0]}
          </p>
        )}
      </div>

      {/* 🏷️ TYPE */}
      <div className="flex flex-col">
        <label htmlFor="type" className="text-sm font-medium">
          Typ
        </label>
        <input
          id="type"
          type="text"
          placeholder="z. B. U7, Impfung, Kontrolle ..."
          value={formData.type}
          aria-required="true"
          aria-invalid={!!errors.type}
          aria-describedby={errors.type ? "type-error" : undefined}
          onChange={(e) => {
            setFormData({ ...formData, type: e.target.value });
            clearFieldError("type");
          }}
          className="p-2 border rounded"
        />
        {errors.type && (
          <p id="type-error" className="text-sm text-red-600">
            {errors.type[0]}
          </p>
        )}
      </div>

      {/* 📝 NOTES */}
      <div className="flex flex-col">
        <label htmlFor="notes" className="text-sm font-medium">
          Notizen
        </label>
        <textarea
          id="notes"
          placeholder="Optional"
          value={formData.notes}
          aria-invalid={!!errors.notes}
          aria-describedby={errors.notes ? "notes-error" : undefined}
          onChange={(e) => {
            setFormData({ ...formData, notes: e.target.value });
            clearFieldError("notes");
          }}
          className="p-2 border rounded"
        />
        {errors.notes && (
          <p id="notes-error" className="text-sm text-red-600">
            {errors.notes[0]}
          </p>
        )}
      </div>

      {/* 🔘 ACTIONS */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Abbrechen
        </button>

        <button
          type="submit"
          disabled={!isDirty}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
        >
          {isEditing ? "Änderungen speichern" : "Termin hinzufügen"}
        </button>
      </div>
    </form>
  );
};

export default AddAppointmentForm;
