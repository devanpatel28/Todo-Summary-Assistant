import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const requiredEnvVars = [
  "PORT", 
  "COHERE_API_KEY", 
  "SLACK_WEBHOOK_URL",
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID"
];
const envVars = {};
let allVarsLoaded = true;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} is not set in .env`);
    allVarsLoaded = false;
  } else {
    envVars[envVar] = process.env[envVar];
  }
}

if (!allVarsLoaded) {
  process.exit(1); 
}

// setConfig(envVars);
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", todoRoutes);

const PORT = envVars.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
