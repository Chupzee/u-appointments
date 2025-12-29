import type { Appointment } from "../types/appointment";

export const sortAppointmentsByDate = (
  appointments: Appointment[]
): Appointment[] => {
    const sortedArray = [...appointments].sort(
      (a, b) => {
        const timestampA = new Date(a.date).getTime();
        const timestampB = new Date(b.date).getTime();
        return timestampA - timestampB;
    });
  return sortedArray;
};
