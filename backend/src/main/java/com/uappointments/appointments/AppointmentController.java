package com.uappointments.appointments;

import com.uappointments.appointments.dto.AppointmentDto;
import com.uappointments.appointments.dto.CreateAppointmentRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        var entity = new Appointment(req.title(), req.startsAt(), req.endsAt(), req.notes());
        var saved = repo.save(entity);
        return toDto(saved);
    }

    @GetMapping("/{id}")
    public AppointmentDto get(@PathVariable Long id) {
        var entity = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        return toDto(entity);
    }

    private static AppointmentDto toDto(Appointment a) {
        return new AppointmentDto(a.getId(), a.getTitle(), a.getStartsAt(), a.getEndsAt(), a.getNotes());
    }
}
