import { describe, it, expect } from "vitest";
import { removeAppointment } from "../domain/appointments";

const appointments = [
  { id: 1, date: "2024-01-01", type: "U7", notes: "" },
  { id: 2, date: "2024-02-01", type: "Impfung", notes: "" },
];

describe("removeAppointment", () => {
  it("removes the appointment with the given id", () => {
    const result = removeAppointment(appointments, 1);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("returns the same array if id is not found", () => {
    const result = removeAppointment(appointments, 999);

    expect(result).toHaveLength(2);
  });
});
