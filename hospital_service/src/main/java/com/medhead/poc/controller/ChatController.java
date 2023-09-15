package com.medhead.poc.controller;

import com.medhead.poc.publisher.MessagePublisher;
import com.medhead.poc.publisher.RedisMessagePublisher;
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
}
