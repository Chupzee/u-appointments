package com.uappointments.appointments.dto;

import java.time.OffsetDateTime;

public record AppointmentDto(
        Long id,
        String title,
        OffsetDateTime startsAt,
        OffsetDateTime endsAt,
        String notes
) {}
