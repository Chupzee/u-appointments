import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Appointment } from "../types/appointment";
import {
  loadAppointments,
  saveAppointments,
} from "../services/appointmentStorage";
import {
  addAppointment,
  updateAppointment,
  removeAppointment,
} from "../domain/appointments";

const QUERY_KEY = ["appointments"];

export function useAppointmentsQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: loadAppointments,
  });
}

export function useAddAppointmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAppointment: Appointment) => {
      const current = await loadAppointments();
      const updated = addAppointment(current, newAppointment);
      await saveAppointments(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateAppointmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointment: Appointment) => {
      const current = await loadAppointments();
      const updated = updateAppointment(current, appointment);
      await saveAppointments(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useRemoveAppointmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const current = await loadAppointments();
      const updated = removeAppointment(current, id);
      await saveAppointments(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
