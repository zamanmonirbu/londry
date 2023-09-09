// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmMwDZnHt7szSduF1g2CaYFNA29BN1-Ww",
  authDomain: "laundry-app-fc0e7.firebaseapp.com",
  projectId: "laundry-app-fc0e7",
  storageBucket: "laundry-app-fc0e7.appspot.com",
  messagingSenderId: "1073435391697",
  appId: "1:1073435391697:web:9aa145dae36e86b9db77f0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore();

export { auth, db };
