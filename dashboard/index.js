
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import ejs from "ejs";
import { configDotenv } from "dotenv";
import { dbConnection } from "./db/db.js";
import packageJson from './package.json' with {type: 'json'};

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//health check 
app.get("/health", (req, res) => {
  res.send("Health OK!");
});

app.listen(port, () => {
  dbConnection();
  console.log(`Sever is listening port :${port} `);
});
