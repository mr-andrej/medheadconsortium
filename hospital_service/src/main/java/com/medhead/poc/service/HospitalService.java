package com.medhead.poc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.medhead.poc.model.Hospital;
import com.medhead.poc.repository.HospitalRepository;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    @Autowired
    public HospitalService(HospitalRepository hospitalRepository) {

        this.hospitalRepository = hospitalRepository;
    }

    // Fetch all hospitals
    public List<Hospital> getAllHospitals() {

        return hospitalRepository.findAll();
    }

    // Fetch a single hospital by ID
    public Optional<Hospital> getHospitalById(Long id) {

        return hospitalRepository.findById(id);
    }

    // Save a hospital
    public Hospital saveHospital(Hospital hospital) {

        return hospitalRepository.save(hospital);
    }

    // Update a hospital
    public Hospital updateHospital(Hospital hospital) {

        return hospitalRepository.save(hospital);
    }

    public void deleteHospital(Long id) {

        hospitalRepository.deleteById(id);
    }

}

