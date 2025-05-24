import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getConfig } from "../config/envConfig.js";

const config = getConfig();

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
};

// Validate config
if (!Object.values(firebaseConfig).every((value) => value)) {
  throw new Error("Missing Firebase configuration values");
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };