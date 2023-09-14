package com.medhead.poc.service;

import com.medhead.poc.publisher.RedisPublisher;

public class RedisService {

    // Publish a message to a specific channel name
    public void publishMessageToChannel(String message, String channelName) {
        RedisPublisher publisher = new RedisPublisher("localhost", 6379);
        publisher.publish(channelName, message);
    }
}
