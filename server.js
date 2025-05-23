require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const app = express();
const routes = require("./app/router/index");

const { connectToDb } = require("./app/config/db");

const swaggerOptions = require("./app/config/swagger");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const { connectRedis } = require("./app/config/redis");

app.use(express.json());

app.use("/api", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.HTTP_PORT, async () => {
  await connectToDb();
  await connectRedis();

  console.log("app run on port ", process.env.HTTP_PORT);
});
