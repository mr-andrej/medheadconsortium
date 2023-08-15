package com.medhead.poc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.medhead.poc.model.EmergencyResponder;

@Repository
public interface EmergencyResponderRepository extends JpaRepository<EmergencyResponder, Long> {
}
