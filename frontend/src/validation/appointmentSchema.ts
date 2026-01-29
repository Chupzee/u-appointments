import { z } from "zod";

export const appointmentSchema = z.object({
  id: z.number(),
  date: z
    .string()
    .refine((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, {
      message: "Date must not be in the past",
    }),
  type: z.string().min(1, "Type is required"),
  notes: z.string().optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
