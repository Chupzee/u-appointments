import type { Appointment } from "../types/appointment";

export const removeAppointment = (
  appointments: Appointment[],
  id: number
): Appointment[] => {
  return appointments.filter((a) => a.id !== id);
};


export const updateAppointment = (
  appointments: Appointment[],
  updated: Appointment
): Appointment[] => {
  return appointments.map((a) =>
    a.id === updated.id ? updated : a
  );
};
export const addAppointment = (
  appointments: Appointment[],
  newAppointment: Appointment
): Appointment[] => {
  return [...appointments, newAppointment];
};