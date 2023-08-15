package com.medhead.poc.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "emergency_responder")
public class EmergencyResponder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String organization; // e.g., "Ursa Major Health", "Emergency Expert Systems"

    @Column(name="contact_number")
    private String contactNumber;

    private String specialization; // e.g., "Cardiac Emergencies", "Trauma"

    private String location; // e.g., "Central Station", "Downtown Clinic"

    @Column(length=2000)
    private String notes; // Any additional information or notes about the responder
}
