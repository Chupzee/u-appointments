import { describe, it, expect, beforeEach, vi } from "vitest";
import { getVisibleAppointments } from "../domain/appointmentsView";

const mockAppointments = [
  { id: 1, date: "2024-01-01", type: "U7", notes: "" },
  { id: 2, date: "2024-06-01", type: "Impfung", notes: "" },
  { id: 3, date: "2023-12-01", type: "U6", notes: "" },
];

describe("getVisibleAppointments", () => {
  let now: Date;

  beforeEach(() => {
    now = new Date("2024-01-15");
    vi.setSystemTime(now);
  });

  it("filters by query", () => {
    const result = getVisibleAppointments(mockAppointments, {
      query: "Impfung",
      show: "all",
      sort: "asc",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  })

  it("filters by show: upcoming", () => {
    const result = getVisibleAppointments(mockAppointments, {
      query: "",
      show: "upcoming",
      sort: "asc",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("filters by show: past", () => {
    const result = getVisibleAppointments(mockAppointments, {
      query: "",
      show: "past",
      sort: "asc",
    });

    expect(result).toHaveLength(2);
    expect(result.map(a => a.id)).toEqual([3, 1]);
  });

  it("sorts ascending", () => {
    const result = getVisibleAppointments(mockAppointments, {
      query: "",
      show: "all",
      sort: "asc",
    });

    expect(result.map(a => a.id)).toEqual([3, 1, 2]);
  });

  it("sorts descending", () => {
    const result = getVisibleAppointments(mockAppointments, {
      query: "",
      show: "all",
      sort: "desc",
    });

    expect(result.map(a => a.id)).toEqual([2, 1, 3]);
  });

});