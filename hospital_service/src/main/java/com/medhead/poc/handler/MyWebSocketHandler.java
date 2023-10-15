package com.medhead.poc.handler;

import com.medhead.poc.service.HospitalService;
import com.medhead.poc.model.Hospital;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MyWebSocketHandler extends TextWebSocketHandler {

    private HospitalService hospitalService;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // For this example, let's assume the client sends a message with the ID of a hospital
        // and expects to get back the details of that hospital.

        Long hospitalId = Long.parseLong(message.getPayload());
        Hospital hospital = hospitalService.getHospitalById(hospitalId).orElse(null);

        if (hospital != null) {
            String hospitalJson = objectMapper.writeValueAsString(hospital);
            session.sendMessage(new TextMessage(hospitalJson));
        } else {
            session.sendMessage(new TextMessage("Hospital not found with ID: " + hospitalId));
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // This method will be invoked after the WebSocket connection is established.
        // You can add any setup logic here if needed.
        System.out.println("WebSocket connection established with session: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // This method will be invoked after the WebSocket connection is closed.
        // You can add any cleanup logic here if needed.
        System.out.println("WebSocket connection closed with session: " + session.getId());
    }
}


