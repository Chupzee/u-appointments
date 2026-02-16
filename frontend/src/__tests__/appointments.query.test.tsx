import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import {
  useAppointmentsQuery,
  useAddAppointmentMutation,
} from "../queries/appointments";

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
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("appointments query layer", () => {
  it("adds an appointment and updates the UI", async () => {
    const user = userEvent.setup();
    renderWithClient(<TestComponent />);

    expect(screen.getByTestId("count")).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("1");
    });
  });
});
