package com.medhead.poc;

import com.medhead.poc.model.Patient;
import com.medhead.poc.service.PatientService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class PatientControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PatientService patientService;

    private Patient patient1;
    private Patient patient2;

    @Autowired
    private ObjectMapper objectMapper;

    // TODO : Write tests using verify and patient1 and patient2
    @BeforeEach
    public void setUp() {
        patient1 = new Patient();
        patient1.setId(1L);
        patient1.setFullName("John Doe");
        patient1.setDateOfBirth("1985-06-15");
        patient1.setGender("Male");
        patient1.setAddress("123 Main St, London");
        patient1.setPatientContactNumber("+441234567890");
        patient1.setEmergencyContactNumber("+449876543210");
        patient1.setMedicalHistory("No known allergies. Had surgery in 2010 for appendicitis.");

        patient2 = new Patient();
        patient2.setId(2L);
        patient2.setFullName("Jane Smith");
        patient2.setDateOfBirth("1990-02-25");
        patient2.setGender("Female");
        patient2.setAddress("456 Elm St, Manchester");
        patient2.setPatientContactNumber("+441234567891");
        patient2.setEmergencyContactNumber("+449876543211");
        patient2.setMedicalHistory("Allergic to penicillin. Diagnosed with asthma in 2015.");
    }

    @Test
    public void testGetAllPatients() throws Exception {
        when(patientService.getAllPatients()).thenReturn(Arrays.asList(patient1, patient2));

        mockMvc.perform(get("/api/patients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fullName").value("John Doe"))
                .andExpect(jsonPath("$[1].fullName").value("Jane Smith"));

        verify(patientService, times(1)).getAllPatients();
    }

    @Test
    public void testGetPatientById() throws Exception {
        when(patientService.getPatientById(1L)).thenReturn(Optional.of(patient1));

        mockMvc.perform(get("/api/patients/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fullName").value("John Doe"));

        verify(patientService, times(1)).getPatientById(1L);
    }

    @Test
    public void testSavePatient() throws Exception {
        when(patientService.savePatient(any(Patient.class))).thenReturn(patient1);

        mockMvc.perform(post("/api/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(patient1)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.fullName").value("John Doe"));

        verify(patientService, times(1)).savePatient(any(Patient.class));
    }

    @Test
    public void testUpdatePatient() throws Exception {
        when(patientService.getPatientById(anyLong())).thenReturn(Optional.of(new Patient()));
        when(patientService.savePatient(any(Patient.class))).thenReturn(new Patient());
        mockMvc.perform(put("/api/patients/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new Patient())))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeletePatient() throws Exception {
        when(patientService.getPatientById(anyLong())).thenReturn(Optional.of(new Patient()));
        mockMvc.perform(delete("/api/patients/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}

