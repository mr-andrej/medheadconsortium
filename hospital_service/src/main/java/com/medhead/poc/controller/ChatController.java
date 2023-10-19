package com.medhead.poc.controller;

import com.medhead.poc.publisher.MessagePublisher;
import com.medhead.poc.publisher.RedisMessagePublisher;
import com.medhead.poc.service.HospitalService;
import com.medhead.poc.subscriber.RedisMessageSubscriber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private RedisMessagePublisher redisMessagePublisher;

    @Autowired
    private RedisMessageSubscriber redisMessageSubscriber;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody String message) {
        redisMessagePublisher.publish(message);
        return new ResponseEntity<>("Message sent!", HttpStatus.OK);
    }

    @GetMapping("/receive")
    public ResponseEntity<List<String>> receiveMessages() {
        return new ResponseEntity<>(redisMessageSubscriber.getReceivedMessages(), HttpStatus.OK);
    }

    /*
    @PostMapping("/send/{hospitalId}/{emergencyResponderId}")
    public ResponseEntity<String> sendMessage(@PathVariable Long hospitalId, @PathVariable Long emergencyResponderId, @RequestBody String message) {
        // Use hospitalId and emergencyResponderId to identify the chat participants
        String chatRoomId = generateChatRoomId(hospitalId, emergencyResponderId);
        redisMessagePublisher.publish(chatRoomId, message);
        return new ResponseEntity<>("Message sent!", HttpStatus.OK);
    }

    @GetMapping("/receive/{hospitalId}/{emergencyResponderId}")
    public ResponseEntity<List<String>> receiveMessages(@PathVariable Long hospitalId, @PathVariable Long emergencyResponderId) {
        // Use hospitalId and emergencyResponderId to identify the chat participants
        String chatRoomId = generateChatRoomId(hospitalId, emergencyResponderId);
        return new ResponseEntity<>(redisMessageSubscriber.getReceivedMessages(chatRoomId), HttpStatus.OK);
    }

    private String generateChatRoomId(Long hospitalId, Long emergencyResponderId) {
        // Generate a unique chat room ID using hospitalId and emergencyResponderId
        return "chat_" + hospitalId + "_" + emergencyResponderId;
    }*/
}
