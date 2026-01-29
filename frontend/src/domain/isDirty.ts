import type { Appointment } from "../types/appointment";

export const isAppointmentDirty = (
  original: Appointment,
  current: Appointment
): boolean => {
  return (
    original.date !== current.date ||
    original.type !== current.type ||
    (original.notes ?? "") !== (current.notes ?? "")
  );
};
