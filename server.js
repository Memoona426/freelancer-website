require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const routes = require("./app/router/index");
const { connectToDb } = require("./app/config/db");
const { connectRedis } = require("./app/config/redis");

const swaggerOptions = require("./app/config/swagger");
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const { createBullBoard } = require("@bull-board/api");
const { ExpressAdapter } = require("@bull-board/express");
const { BullAdapter } = require("@bull-board/api/bullAdapter");

const myQueue = require("./app/workers/notificationWorker");
const notificationQueue = require("./app/config/notificationQueue");

const { chatSocket } = require("./app/sockets/chatSocket");
const { setIO } = require("./app/helpers/socketIO");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullAdapter(notificationQueue)],
  serverAdapter,
});

const app = express();
app.use(express.json());

app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/admin/queues", serverAdapter.getRouter());

const httpServer = http.createServer(app);
const io = socketIo(httpServer);

module.exports = { io };
const startServer = async () => {
  try {
    await connectToDb();
    // await connectRedis();

    const PORT = process.env.HTTP_PORT || 3000;
    await chatSocket(io)

    setIO(io);
    httpServer.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });


  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

