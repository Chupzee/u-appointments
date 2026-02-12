package com.uappointments.appointments;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.uappointments.appointments.dto.AppointmentDto;
import com.uappointments.appointments.dto.CreateAppointmentRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository repo;

    public AppointmentController(AppointmentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<AppointmentDto> list() {
        return repo.findAll().stream().map(AppointmentController::toDto).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentDto create(@Valid @RequestBody CreateAppointmentRequest req) {
        var entity = new Appointment(req.type(), req.date(), req.notes());
        var saved = repo.save(entity);
        return toDto(saved);
    }

    @GetMapping("/{id}")
    public AppointmentDto get(@PathVariable Long id) {
        var entity = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        return toDto(entity);
    }

    private static AppointmentDto toDto(Appointment a) {
        return new AppointmentDto(a.getId(), a.getType(), a.getDate(), a.getNotes());
    }
}
