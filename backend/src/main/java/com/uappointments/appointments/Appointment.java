package com.uappointments.appointments;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private OffsetDateTime startsAt;

    @Column(nullable = false)
    private OffsetDateTime endsAt;

    private String notes;

    protected Appointment() { } // JPA

    public Appointment(String title, OffsetDateTime startsAt, OffsetDateTime endsAt, String notes) {
        this.title = title;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.notes = notes;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public OffsetDateTime getStartsAt() { return startsAt; }
    public OffsetDateTime getEndsAt() { return endsAt; }
    public String getNotes() { return notes; }

    public void setTitle(String title) { this.title = title; }
    public void setStartsAt(OffsetDateTime startsAt) { this.startsAt = startsAt; }
    public void setEndsAt(OffsetDateTime endsAt) { this.endsAt = endsAt; }
    public void setNotes(String notes) { this.notes = notes; }
}
