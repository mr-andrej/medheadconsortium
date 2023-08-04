package com.medhead.poc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medhead.poc.model.Hospital;
import com.medhead.poc.service.HospitalService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class HospitalControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HospitalService hospitalService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllHospitals() throws Exception {
        when(hospitalService.getAllHospitals()).thenReturn(Arrays.asList(new Hospital(), new Hospital()));
        mockMvc.perform(get("/api/hospitals")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetHospitalById() throws Exception {
        when(hospitalService.getHospitalById(anyLong())).thenReturn(Optional.of(new Hospital()));
        mockMvc.perform(get("/api/hospitals/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testSaveHospital() throws Exception {
        when(hospitalService.saveHospital(any(Hospital.class))).thenReturn(new Hospital());
        mockMvc.perform(post("/api/hospitals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new Hospital())))
                .andExpect(status().isCreated());
    }

    @Test
    public void testUpdateHospital() throws Exception {
        when(hospitalService.getHospitalById(anyLong())).thenReturn(Optional.of(new Hospital()));
        when(hospitalService.saveHospital(any(Hospital.class))).thenReturn(new Hospital());
        mockMvc.perform(put("/api/hospitals/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new Hospital())))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteHospital() throws Exception {
        when(hospitalService.getHospitalById(anyLong())).thenReturn(Optional.of(new Hospital()));
        mockMvc.perform(delete("/api/hospitals/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}
