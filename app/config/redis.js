const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST_NAME,
    port: process.env.REDIS_PORT,
  },
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log("Redis Client is connected");
  }
};

module.exports = { client, connectRedis };
