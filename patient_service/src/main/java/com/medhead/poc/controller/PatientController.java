package com.medhead.poc.controller;

import com.medhead.poc.model.Patient;
import com.medhead.poc.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Patient patient = patientService.getPatientById(id)
                .orElseThrow(() -> new NoSuchElementException("Patient not found with id: " + id));
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Patient> savePatient(@RequestBody Patient patient) {
        Patient savedPatient = patientService.savePatient(patient);
        return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        Patient existingPatient = patientService.getPatientById(id)
                .orElseThrow(() -> new NoSuchElementException("Patient not found with id: " + id));
        existingPatient.setFullName(patientDetails.getFullName());
        existingPatient.setDateOfBirth(patientDetails.getDateOfBirth());
        existingPatient.setGender(patientDetails.getGender());
        existingPatient.setAddress(patientDetails.getAddress());
        existingPatient.setPatientContactNumber(patientDetails.getPatientContactNumber());
        existingPatient.setEmergencyContactNumber(patientDetails.getEmergencyContactNumber());
        existingPatient.setMedicalHistory(patientDetails.getMedicalHistory());
        patientService.updatePatient(existingPatient);
        return new ResponseEntity<>(existingPatient, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
