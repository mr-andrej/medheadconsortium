package com.medhead.poc.service;

import com.medhead.poc.model.Patient;
import com.medhead.poc.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {

        this.patientRepository = patientRepository;
    }

    // Fetch all patients
    public List<Patient> getAllPatients() {

        return patientRepository.findAll();
    }

    // Fetch a single patient by ID
    public Optional<Patient> getPatientById(Long id) {

        return patientRepository.findById(id);
    }

    // Save a patient
    public Patient savePatient(Patient patient) {

        return patientRepository.save(patient);
    }

    // Update a patient
    public Patient updatePatient(Patient patient) {

        return patientRepository.save(patient);
    }

    // Delete a patient by ID
    public void deletePatient(Long id) {

        patientRepository.deleteById(id);
    }
}
