import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyC7sNRq7gK3DNTN3vt9lakJzLPy5qFHsdY",
  authDomain: "fir-app-fc541.firebaseapp.com",
  projectId: "fir-app-fc541",
  storageBucket: "fir-app-fc541.firebasestorage.app",
  messagingSenderId: "206176422410",
  appId: "1:206176422410:web:8572921b904f1feb3c6df3",
  measurementId: "G-6BZ7F2T5QY"
};

const app = initializeApp(firebaseConfig);
const db=getFirestore(app)