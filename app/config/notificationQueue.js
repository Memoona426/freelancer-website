const Queue = require('bull');
const notificationQueue = new Queue('notificationQueue', {
  redis: {
    host: process.env.REDIS_BULL_HOST,
    port: process.env.REDIS_BULL_PORT,
  }
});

module.exports = notificationQueue;
