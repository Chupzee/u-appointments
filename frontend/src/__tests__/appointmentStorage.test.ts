import { describe, it, expect, beforeEach } from "vitest";
import {
  loadAppointments,
  saveAppointments,
  clearAppointments,
} from "../services/appointmentStorage";

const mockAppointments = [
  { id: 1, date: "2024-01-01", type: "U7", notes: "" },
];

describe("appointmentStorage", () => {
  beforeEach(() => {
    clearAppointments();
  });

  it("returns empty array when nothing is stored", () => {
    expect(loadAppointments()).toEqual([]);
  });

  it("saves and loads appointments", () => {
    saveAppointments(mockAppointments);
    expect(loadAppointments()).toEqual(mockAppointments);
  });
});
