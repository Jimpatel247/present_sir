import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/app";

const firebaseConfig = {
  /* apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID */
  apiKey: "AIzaSyBXwXMQ7Epmgzba2ImBjsIFYRMbR75Xh5w",
  authDomain: "presentsir-e6fb6.firebaseapp.com",
  projectId: "presentsir-e6fb6",
  storageBucket: "presentsir-e6fb6.appspot.com",
  messagingSenderId: "823548679196",
  appId: "1:823548679196:web:28f4f3c4690a8354223bd9",
  measurementId: "G-PHY752KXEQ"
  
};

/* var app;
export default function initFirebase() {
  console.log("hello guys i am under init")
  
  try {
     app = initializeApp(firebaseConfig);
   
    // console.log(app);
  } catch (error) {
    console.log(error);
  }
 
  
console.log("hogaya firebase init");
} */
var app;
if (!firebase?.apps?.length) {
 app= initializeApp(firebaseConfig );
}

export const auth = getAuth(app)
export const db = getFirestore(app)


