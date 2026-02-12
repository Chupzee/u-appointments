package com.uappointments.appointments.dto;

import java.time.LocalDate;

public record AppointmentDto(
        Long id,
        String type,
        LocalDate date,
        String notes
        ) {

}
