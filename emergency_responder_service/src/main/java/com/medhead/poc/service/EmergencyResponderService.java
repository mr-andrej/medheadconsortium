package com.medhead.poc.service;

import com.medhead.poc.model.EmergencyResponder;
import com.medhead.poc.repository.EmergencyResponderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmergencyResponderService {

    private final EmergencyResponderRepository emergencyResponderRepository;

    @Autowired
    public EmergencyResponderService(EmergencyResponderRepository emergencyResponderRepository) {
        this.emergencyResponderRepository = emergencyResponderRepository;
    }

    // Fetch all emergency responders
    public List<EmergencyResponder> getAllResponders() {
        return emergencyResponderRepository.findAll();
    }

    // Fetch a specific emergency responder by ID
    public Optional<EmergencyResponder> getResponderById(Long id) {
        return emergencyResponderRepository.findById(id);
    }

    // Save an emergency responder
    public EmergencyResponder saveResponder(EmergencyResponder emergencyResponder) {
        return emergencyResponderRepository.save(emergencyResponder);
    }

    // Update an emergency responder
    public EmergencyResponder updateResponder(EmergencyResponder emergencyResponder) {
        if(emergencyResponder.getId() == null) {
            throw new IllegalArgumentException("Responder ID must be provided for an update operation.");
        }
        return emergencyResponderRepository.save(emergencyResponder);
    }

    // Delete an emergency responder by ID
    public void deleteResponder(Long id) {
        emergencyResponderRepository.deleteById(id);
    }
}
