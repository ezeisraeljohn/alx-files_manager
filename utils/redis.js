// Description: Redis client for caching
// Used by: utils/cache.js
// Dependencies: redis

const redis = require("redis");

class RedisClient {
  constructor() {
    this.client = redis
      .createClient()
      .on("error", (error) => {
        console.log(error);
      })
      .connect();
  }
  isAlive() {
    return this.client.isReady;
  }
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) reject(error);
        resolve(value);
      });
    });
  }
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
