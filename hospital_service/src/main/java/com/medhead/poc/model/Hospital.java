package com.medhead.poc.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "hospital")
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the hospital
    private String name;

    // Location of the hospital
    private String location;

    // Number of all beds (available and taken)
    @Column(name="number_of_all_beds")
    private Integer numberOfAllBeds;

    // Number of available beds
    @Column(name="number_of_available_beds")
    private Integer numberOfAvailableBeds;

    // Number of unavailable beds
    @Column(name="number_of_unavailable_beds")
    private Integer numberOfUnavailableBeds;

    @ElementCollection
    private List<String> specializations;
}
