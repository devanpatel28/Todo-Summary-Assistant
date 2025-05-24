import dotenv from "dotenv";
dotenv.config();

export const getConfig = () => {
  const config = {
    PORT: process.env.PORT,
    COHERE_API_KEY: process.env.COHERE_API_KEY,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  };
  return config;
};
