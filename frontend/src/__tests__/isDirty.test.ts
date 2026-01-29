import { describe, it, expect } from "vitest";
import { isAppointmentDirty } from "../domain/isDirty";

describe("isAppointmentDirty", () => {
  it("returns true when something has changed", () => {
    const original = {
      id: 1,
      date: "2024-01-01",
      type: "U7",
      notes: "",
    };

    const modified = {
      ...original,
      notes: "new note",
    };

  expect(isAppointmentDirty(original, modified)).toBe(true);
});

it("returns false if nothing changed", () => {
  const a = {
    id: 1,
    date: "2024-01-01",
    type: "U7",
    notes: "",
  };

  expect(isAppointmentDirty(a, a)).toBe(false);
});
});