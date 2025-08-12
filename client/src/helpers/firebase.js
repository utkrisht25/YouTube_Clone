import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: getEvn('VITE_FIREBASE_API'),
  authDomain: "clone-b6e6c.firebaseapp.com",
  projectId: "clone-b6e6c",
  storageBucket: "clone-b6e6c.firebasestorage.app",
  messagingSenderId: "1080813001696",
  appId: "1:1080813001696:web:992541d359b7baaca5e985"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app); 
const provider = new GoogleAuthProvider();

export { auth , provider} ;