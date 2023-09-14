package com.medhead.poc.publisher;

import redis.clients.jedis.Jedis;

public class RedisPublisher {

    private Jedis jedis;

    public RedisPublisher(String host, int port) {
        this.jedis = new Jedis(host, port);
    }

    public void publish(String channel, String message) {
        jedis.publish(channel, message);
    }
}
