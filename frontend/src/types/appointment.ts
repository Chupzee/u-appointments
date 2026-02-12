export type Appointment = {
  id: number;
  date: string; // ISO string
  type: string;
  notes?: string;
};

export type CreateAppointmentInput = {
  date: string; // ISO string
  type: string;
  notes?: string;
};

export type UpdateAppointmentInput = {
  id: number;
  date: string; // ISO string
  type: string;
  notes?: string;
};
