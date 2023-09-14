package com.medhead.poc.subscriber;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPubSub;

public class RedisSubscriber {

    private Jedis jedis;

    public RedisSubscriber(String host, int port) {
        this.jedis = new Jedis(host, port);
    }

    public void subscribe(JedisPubSub listener, String... channels) {
        jedis.subscribe(listener, channels);
    }
}
