package com.uappointments.appointments.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;

public record CreateAppointmentRequest(
        @NotBlank String title,
        @NotNull OffsetDateTime startsAt,
        @NotNull OffsetDateTime endsAt,
        String notes
) {}
