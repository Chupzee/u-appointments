import { http } from "./http";
import type { Appointment } from "../types/appointment";
import type { CreateAppointmentInput } from "../types/appointment";


export function listAppointments(): Promise<Appointment[]> {
  return http<Appointment[]>("/api/appointments");
}

export function createAppointment(input: CreateAppointmentInput): Promise<Appointment> {
  return http<Appointment>("/api/appointments", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateAppointment(input: Appointment): Promise<Appointment> {
  return http<Appointment>(`/api/appointments/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteAppointment(id: number): Promise<void> {
  return http<void>(`/api/appointments/${id}`, {
    method: "DELETE",
  });
}
