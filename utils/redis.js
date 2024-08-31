// Description: Redis client for caching
// Used by: utils/cache.js
// Dependencies: redis

const { createClient } = require('redis');

class RedisClient {
  constructor () {
    this.client = createClient();
    this._isAlive = true;

    this.client.on('error', (error) => {
      console.error(`${error}`);
      this._isAlive = false;
    });

    this.client.on('connect', () => {
      this._isAlive = true;
    });
  }

  isAlive () {
    return this._isAlive;
  }

  async get (key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) reject(error);
        resolve(value);
      });
    });
  }

  async set (key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del (key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
