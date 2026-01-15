import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import {
  useAppointmentsQuery,
  useAddAppointmentMutation,
} from "../queries/appointments";
import type { Appointment } from "../types/appointment";

// --- Mock storage layer ---
vi.mock("../services/appointmentStorage", () => {
  let store: Appointment[] = [];

  return {
    loadAppointments: vi.fn(async () => store),
    saveAppointments: vi.fn(async (next: Appointment[]) => {
      store = next;
    }),
  };
});

// --- Test component ---
function TestComponent() {
  const { data = [] } = useAppointmentsQuery();
  const addMutation = useAddAppointmentMutation();

  return (
    <div>
      <div data-testid="count">{data.length}</div>
      <button
        onClick={() =>
          addMutation.mutate({
            id: 1,
            date: "2025-01-01",
            type: "U7",
            notes: "",
          })
        }
      >
        Add
      </button>
    </div>
  );
}

// --- Test wrapper ---
function renderWithClient(ui: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("appointments query layer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("adds an appointment and updates the UI", async () => {
    renderWithClient(<TestComponent />);

    // initially 0
    expect(screen.getByTestId("count").textContent).toBe("0");

    // click add
    await userEvent.click(screen.getByText("Add"));

    // wait for UI update
    await waitFor(() => {
      expect(screen.getByTestId("count").textContent).toBe("1");
    });
  });
});
