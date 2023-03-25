/* 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const credntial = {
    apiKey:  process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain:  process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
      projectId:  process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      storageBucket:  process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
      messagingSenderId:  process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
      appId:  process.env.NEXT_PUBLIC_FIREBASE_APPID,
      measurementId:  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID
};
// console.log(process.env.NEXT_PUBLIC_FIREBASE_APIKEY)
export default function initFirebase() {
  if (typeof window !== undefined) {
      const app=firebase.initializeApp(credntial);
      console.log("Firebase has been init successfully");
  }
}
 */
/* import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage }; */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};

// Initialize Firebase


export default function initFirebase() {
  


  console.log("hello guys i am under init")
  
  try {
    const app = initializeApp(firebaseConfig);
    // console.log(app);
  } catch (error) {
    console.log(error);
  }
 
  
console.log("hogaya firebase init");
}




