import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAU3E-qkmaAFhNKlANqzcHC8uZyFCZZLas",
  authDomain: "ai-trip-planner-98ad0.firebaseapp.com",
  projectId: "ai-trip-planner-98ad0",
  storageBucket: "ai-trip-planner-98ad0.firebasestorage.app",
  messagingSenderId: "841975157248",
  appId: "1:841975157248:web:48e167bb301b012ea4fee5",
  measurementId: "G-M5H3826KE7"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);