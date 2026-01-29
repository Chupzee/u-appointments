import type { Appointment } from "../types/appointment";

type ViewOptions = {
  query: string;
  show: "upcoming" | "all" | "past";
  sort: "asc" | "desc";
  now?: Date;
};

export function getVisibleAppointments(
  appointments: Appointment[],
  { query, show, sort, now = new Date() }: ViewOptions
): Appointment[] {
  const q = query.trim().toLowerCase();

  const filtered = appointments.filter((a) => {
    const matchesQuery =
      !q ||
      a.type.toLowerCase().includes(q) ||
      (a.notes ?? "").toLowerCase().includes(q);

    if (!matchesQuery) return false;

    const date = new Date(a.date + "T00:00:00");
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    if (show === "all") return true;
    if (show === "upcoming") return date >= today;
    return date < today; // past
  });

  filtered.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return sort === "asc" ? da - db : db - da;
  });

  return filtered;
}
