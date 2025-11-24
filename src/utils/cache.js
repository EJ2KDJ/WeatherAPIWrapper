import { createClient } from "redis";

// Create and configure Redis client
const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  password: process.env.REDIS_PASSWORD
});

// Error Handler
client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

// Connect to Redis server
await client.connect();

// Store data in Redis cache with expiration time
export async function setCache(key, value, expirationInSeconds) {
    await client.set(key, value, { EX: expirationInSeconds });
}

// Retrieve data from Redis cache
export async function getCache(key) {
    return await client.get(key);
}