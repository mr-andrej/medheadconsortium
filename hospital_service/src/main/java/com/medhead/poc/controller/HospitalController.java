package com.medhead.poc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.medhead.poc.model.Hospital;
import com.medhead.poc.service.HospitalService;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    private final HospitalService hospitalService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    public HospitalController(HospitalService hospitalService) {

        this.hospitalService = hospitalService;
    }

    @GetMapping
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        return new ResponseEntity<>(hospitals, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hospital> getHospitalById(@PathVariable Long id) {
        Hospital hospital = hospitalService.getHospitalById(id)
                .orElseThrow(() -> new NoSuchElementException("Hospital not found with id: " + id));
        return new ResponseEntity<>(hospital, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Hospital> saveHospital(@RequestBody Hospital hospital) {
        Hospital savedHospital = hospitalService.saveHospital(hospital);
        return new ResponseEntity<>(savedHospital, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable Long id, @RequestBody Hospital hospitalDetails) {
        Hospital existingHospital = hospitalService.getHospitalById(id)
                .orElseThrow(() -> new NoSuchElementException("Hospital not found with id: " + id));
        existingHospital.setName(hospitalDetails.getName());
        existingHospital.setLocation(hospitalDetails.getLocation());
        existingHospital.setNumberOfAllBeds(hospitalDetails.getNumberOfAllBeds());
        existingHospital.setNumberOfAvailableBeds(hospitalDetails.getNumberOfAvailableBeds());
        existingHospital.setNumberOfUnavailableBeds(hospitalDetails.getNumberOfUnavailableBeds());
        existingHospital.setSpecializations(hospitalDetails.getSpecializations());
        hospitalService.updateHospital(existingHospital);
        return new ResponseEntity<>(existingHospital, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHospital(@PathVariable Long id) {
        Hospital existingHospital = hospitalService.getHospitalById(id)
                .orElseThrow(() -> new NoSuchElementException("Hospital not found with id: " + id));
        hospitalService.deleteHospital(existingHospital.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
