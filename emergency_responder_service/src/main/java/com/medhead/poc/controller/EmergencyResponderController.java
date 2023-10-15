package com.medhead.poc.controller;

import com.medhead.poc.model.EmergencyResponder;
import com.medhead.poc.service.EmergencyResponderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/responders")
public class EmergencyResponderController {

    private final EmergencyResponderService emergencyResponderService;

    @Autowired
    public EmergencyResponderController(EmergencyResponderService emergencyResponderService) {
        this.emergencyResponderService = emergencyResponderService;
    }

    @GetMapping
    public ResponseEntity<List<EmergencyResponder>> getAllResponders() {
        List<EmergencyResponder> responders = emergencyResponderService.getAllResponders();
        return new ResponseEntity<>(responders, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmergencyResponder> getResponderById(@PathVariable Long id) {
        EmergencyResponder responder = emergencyResponderService.getResponderById(id)
                .orElseThrow(() -> new NoSuchElementException("Responder not found with id: " + id));
        return new ResponseEntity<>(responder, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EmergencyResponder> saveResponder(@RequestBody EmergencyResponder emergencyResponder) {
        EmergencyResponder savedResponder = emergencyResponderService.saveResponder(emergencyResponder);
        return new ResponseEntity<>(savedResponder, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmergencyResponder> updateResponder(@PathVariable Long id, @RequestBody EmergencyResponder responderDetails) {
        EmergencyResponder existingResponder = emergencyResponderService.getResponderById(id)
                .orElseThrow(() -> new NoSuchElementException("Responder not found with id: " + id));
        existingResponder.setName(responderDetails.getName());
        existingResponder.setOrganization(responderDetails.getOrganization());
        existingResponder.setContactNumber(responderDetails.getContactNumber());
        existingResponder.setSpecialization(responderDetails.getSpecialization());
        existingResponder.setLocation(responderDetails.getLocation());
        existingResponder.setNotes(responderDetails.getNotes());
        emergencyResponderService.updateResponder(existingResponder);
        return new ResponseEntity<>(existingResponder, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResponder(@PathVariable Long id) {
        emergencyResponderService.deleteResponder(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
