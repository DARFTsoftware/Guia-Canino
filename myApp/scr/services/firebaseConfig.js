import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlJRuOMmhX7-23HqK8-4zwyBOVB2BtL8M",
  authDomain: "aaa01-6d50e.firebaseapp.com",
  databaseURL: "https://aaa01-6d50e-default-rtdb.firebaseio.com",
  projectId: "aaa01-6d50e",
  storageBucket: "aaa01-6d50e.appspot.com",
  messagingSenderId: "112590453924",
  appId: "1:112590453924:web:7bd30c395f9acd418ffa31",
  measurementId: "G-MXFNG40JJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);