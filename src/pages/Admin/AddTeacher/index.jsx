import Head from "next/head";
import React, { useState } from "react";
import styles from "../../../styles/admin/teacher.module.css";
import { useRouter } from "next/router";
import {auth, db } from "@/firebase/initFirebase";
import {  createUserWithEmailAndPassword } from 'firebase/auth'
import { doc,collection, addDoc,query, where } from "firebase/firestore"; 

function Teacher() {
  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true)
  async function submitHandler(e) {
    e.preventDefault()
    if (!email || !name) {
        setError('Please enter email and password')
        return
    }
    if (isLoggingIn) {
          var password=name+"@123";
          // console.log(password);
          createUserWithEmailAndPassword(auth, email, password).then(async function (){
          
          console.log("teacher add hogaya")
          const docRef = await addDoc(collection(db, "Teachers"), {
            email:email,
            name:name,
            classes:[]
            
          }).catch((err) => {
            console.log(err);

          });
          console.log("Document written with ID(bolo Jay shree ram): ", docRef.id);
          router.push("/Admin")
        }).catch((error) => {
          if (error.code == "auth/email-already-in-use") {
              alert("The email address is already in use");
              return;
          } else if (error.code == "auth/invalid-email") {
              alert("The email address is not valid.");
          } else if (error.code == "auth/operation-not-allowed") {
              alert("Operation not allowed.");
          } else if (error.code == "auth/weak-password") {
              alert("The password is too weak.");
          }
        });
    

    }
  
} 
  return (
    <>
      <Head>
        <title>Admin: New Teacher</title>
      </Head>
      <div className="page-container">
        <div className={styles.container}>
          <form onSubmit={submitHandler} className={styles.form}>
            <label htmlFor="email">Name:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="Name"
            />
            <label htmlFor="email">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              placeholder="Email"
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Teacher;
