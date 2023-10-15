package com.medhead.poc.subscriber;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;

@Service
public class RedisMessageSubscriber implements MessageListener {

    private static List<String> messageList = new ArrayList<>();

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String receivedMessage = new String(message.getBody());
        messageList.add(receivedMessage);
        // Handle the message (e.g., send it to connected clients via WebSocket)
        System.out.println("Received message: " + receivedMessage);
    }

    public List<String> getReceivedMessages() {
        return messageList;
    }
}

