package com.medhead.poc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medhead.poc.model.EmergencyResponder;
import com.medhead.poc.service.EmergencyResponderService;
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
public class EmergencyResponderControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmergencyResponderService emergencyResponderService;

    private EmergencyResponder testResponder;

    @BeforeEach
    public void setUp() {
        testResponder = new EmergencyResponder();
        testResponder.setId(1L);
        testResponder.setName("John Doe");
        testResponder.setOrganization("Ursa Major Health");
        testResponder.setContactNumber("1234567890");
        testResponder.setSpecialization("Cardiac Emergencies");
        testResponder.setLocation("Central Station");
        testResponder.setNotes("Experienced paramedic with 10 years of service.");
    }

    @Test
    public void testGetAllResponders() throws Exception {
        when(emergencyResponderService.getAllResponders()).thenReturn(Arrays.asList(testResponder));

        mockMvc.perform(get("/api/responders"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("John Doe"));
    }

    @Test
    public void testGetResponderById() throws Exception {
        when(emergencyResponderService.getResponderById(1L)).thenReturn(Optional.of(testResponder));

        mockMvc.perform(get("/api/responders/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("John Doe"));
    }

    @Test
    public void testSaveResponder() throws Exception {
        when(emergencyResponderService.saveResponder(any(EmergencyResponder.class))).thenReturn(testResponder);

        mockMvc.perform(post("/api/responders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(testResponder)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("John Doe"));

        verify(emergencyResponderService, times(1)).saveResponder(any(EmergencyResponder.class));
    }

    @Test
    public void testUpdateResponder() throws Exception {
        when(emergencyResponderService.getResponderById(1L)).thenReturn(Optional.of(testResponder));
        when(emergencyResponderService.updateResponder(any(EmergencyResponder.class))).thenReturn(testResponder);

        mockMvc.perform(put("/api/responders/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"name\": \"John Smith\", \"organization\": \"Ursa Major Health\", \"contactNumber\": \"1234567890\", \"specialization\": \"Cardiac Emergencies\", \"location\": \"Central Station\", \"notes\": \"Experienced paramedic with 10 years of service.\" }"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Smith"));
    }

    @Test
    public void testDeleteResponder() throws Exception {
        doNothing().when(emergencyResponderService).deleteResponder(1L);

        mockMvc.perform(delete("/api/responders/1"))
                .andExpect(status().isNoContent());
    }
}
