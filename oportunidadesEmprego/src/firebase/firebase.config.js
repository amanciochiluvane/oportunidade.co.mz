// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnLlYAfHViJDeTTK_r3ShBqdPM644S-Fw",
  authDomain: "oportunidadesemprego-3fa53.firebaseapp.com",
  projectId: "oportunidadesemprego-3fa53",
  storageBucket: "oportunidadesemprego-3fa53.appspot.com",
  messagingSenderId: "74512810224",
  appId: "1:74512810224:web:041eda9d62dcc7609bc235",
  measurementId: "G-YQYYYTG0HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);


export default app;
export {storage};


