import { describe, it, expect } from "vitest";
import { appointmentSchema } from "../validation/appointmentSchema";

describe("appointmentSchema", () => {
  it("accepts a valid appointment", () => {
    const result = appointmentSchema.safeParse({
      id: 1,
      date: new Date().toISOString().slice(0, 10),
      type: "U7",
      notes: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects empty type", () => {
    const result = appointmentSchema.safeParse({
      id: 1,
      date: new Date().toISOString().slice(0, 10),
      type: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects past date", () => {
    const result = appointmentSchema.safeParse({
      id: 1,
      date: "2000-01-01",
      type: "U7",
    });

    expect(result.success).toBe(false);
  });
});
