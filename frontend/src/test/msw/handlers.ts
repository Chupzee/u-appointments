import { http, HttpResponse } from "msw";
import type { Appointment } from "../../types/appointment";

let store: Appointment[] = [];
let nextId = 1; // simple incrementing counter

export const handlers = [
  http.get("/api/appointments", () => {
    return HttpResponse.json(store);
  }),

  http.post("/api/appointments", async ({ request }) => {
    const body = (await request.json()) as Omit<Appointment, "id">;

    const created: Appointment = {
      id: nextId++,   // ← numeric ID
      ...body,
    };

    store = [...store, created];
    return HttpResponse.json(created, { status: 201 });
  }),
];
