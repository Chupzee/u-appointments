import type { Appointment } from "../types/appointment";

const STORAGE_KEY = "u-appointments";

export const loadAppointments = (): Appointment[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Appointment[];
  } catch {
    return [];
  }
};

export const saveAppointments = (appointments: Appointment[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

export const clearAppointments = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
