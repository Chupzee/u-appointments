import { http } from "./http";

export type Appointment = {
  id: number;
  title: string;
  startsAt: string; // ISO string
  endsAt: string;   // ISO string
  notes?: string | null;
};

export type CreateAppointmentInput = {
  title: string;
  startsAt: string; // ISO string
  endsAt: string;   // ISO string
  notes?: string | null;
};

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
