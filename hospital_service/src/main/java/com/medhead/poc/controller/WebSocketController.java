package com.medhead.poc.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/send/message")
    @SendTo("/topic/message")
    public String broadcastMessage(String message) {
        return message;
    }
}
