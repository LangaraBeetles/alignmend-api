import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import router from "./src/routes/index.js";
import connection from "./src/models/db.js";
import checkJwt from "./src/middleware/auth.middleware.js";
import {getAuthToken} from './src/controllers/auth.controllers.js'

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

// DB connection
try {
  connection.once("open", () => {
    const server = app.listen(port, () => {
      console.log(`Connected and listening http://localhost:${port}`);
      console.log(`Test endpoint http://localhost:${port}/api/v1/test`);
    });
  });
} catch (error) {
  console.error({ error });
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Public routes which don't require a TOKEN
app.post("/api/v1/auth", getAuthToken)

// Routes required to have a valid TOKEN
// app.use("/api/v1", checkJwt, router);
app.use("/api/v1", router); //TODO uncomment above line and remove this line

router.get("/test", (req, res) => {
  res.type("text/plain");
  res.status(200);
  res.send("Working! Demo Auto Deploy");
});
