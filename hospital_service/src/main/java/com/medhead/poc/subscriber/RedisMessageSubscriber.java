package com.medhead.poc.subscriber;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;

@Service
public class RedisMessageSubscriber implements MessageListener {

    private static Map<String, List<String>> chatRooms = new HashMap<>();
    private static List<String> messageList = new ArrayList<>();

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String receivedMessage = new String(message.getBody());
        messageList.add(receivedMessage);
        // Handle the message (e.g., send it to connected clients via WebSocket)
        System.out.println("Received message: " + receivedMessage);
    }

    /*

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String receivedMessage = new String(message.getBody());
        String chatRoomId = new String(pattern);

        // Handle the message (e.g., send it to connected clients via WebSocket)
        System.out.println("Received message in chat room " + chatRoomId + ": " + receivedMessage);

        // Store the message in the appropriate chat room
        chatRooms.computeIfAbsent(chatRoomId, k -> new ArrayList<>()).add(receivedMessage);
    }
    public List<String> getReceivedMessages(String chatRoomId) {
        return chatRooms.getOrDefault(chatRoomId, new ArrayList<>());
    }
    */

    public List<String> getReceivedMessages() {
        return messageList;
    }
}

