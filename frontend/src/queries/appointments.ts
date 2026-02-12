import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Appointment } from "../types/appointment";
import {
  listAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../api/appointments";

const QUERY_KEY = ["appointments"];

export function useAppointmentsQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: listAppointments,
  });
}

export function useAddAppointmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateAppointmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useRemoveAppointmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
