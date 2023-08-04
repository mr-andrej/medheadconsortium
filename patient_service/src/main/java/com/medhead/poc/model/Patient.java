package com.medhead.poc.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name="patient")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Temporal(TemporalType.DATE)
    @Column(name="date_of_birth")
    private String dateOfBirth;

    private String gender;

    private String address;

    @Column(name="patient_contact_number")
    private String patientContactNumber;

    @Column(name="emergency_contact_number")
    private String emergencyContactNumber;

    @Column(length=2000, name="date_of_birth")
    private String medicalHistory;
}
