import React from 'react'
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/login.module.css";

import { useRouter } from "next/router";
import {auth, db } from "@/firebase/initFirebase";
import {  createUserWithEmailAndPassword } from 'firebase/auth'

import { doc,collection, addDoc,query, where } from "firebase/firestore"; 
export default function addAdmin() {
    const router = useRouter()
    const [email,setEmail] =useState();
    const [password,setPassword] =useState();
    const [isLoggingIn, setIsLoggingIn] = useState(true)
    // const { login, signup, currentUser } = useAuth()   
    async function submitHandler(e) {
      e.preventDefault()
      if (!email || !password) {
          setError('Please enter email and password')
          return
      }
      if (isLoggingIn) {
        
            createUserWithEmailAndPassword(auth, email, password).then(async function (){
            const docRef = await addDoc(collection(db, "admins"), {
              mail_id:email,
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
          <title>Login</title>
        </Head>
        <div className="page-container">
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.teacher}>
                <form onSubmit={submitHandler}>
                  <img src="/teacher.svg" alt="Professor" />
                  <h2>કેમ દોસ્ત મજામા Sign Up કરી લઇએ?</h2>
                  <div className={styles.fields}>
                    <div className={styles.inputGrp}>
                      <input
                        className={styles.emailInput}
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        type="text"
                        id="teacherEmail"
                        required
                      />
                      <label htmlFor="teacherEmail" className={styles.emailLabel}>
                        Email
                      </label>
                    </div>
                    <div className={styles.inputGrp}>
                      <input
                        className={styles.passInput}
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        type="password"
                        id="teacherPassword"
                        required
                      />
                      <label
                        className={styles.passLabel}
                        htmlFor="teacherPassword"
                      >
                        Password (ખાનગી સબ્દ) તો નાખ 
                      </label>
                    </div>
                    <input
                      className={styles.submitBtn}
                      type="submit"
                      value="Sign Up"
                    />
                    
                  </div> 
                </form>
              </div>
             {/*  <div ref={admin} className={styles.admin}>
                <form>
                  <img src="/teacher.svg" alt="Admin" />
                  <h2>Admin Login</h2>
                  <div className={styles.fields}>
                    <div className={styles.inputGrp}>
                      <input
                        className={styles.emailInput}
                        onChange={(e)=>setAdminEmail(e.target.value)}
                        value={adminEmail}
                        type="text"
                        id="email"
                        required
                      />
                      <label htmlFor="email" className={styles.emailLabel}>
                        Email
                      </label>
                    </div>
                    <div className={styles.inputGrp}>
                      <input
                        className={styles.passInput}
                        onChange={(e)=>setAdminPassword(e.target.value)}
                        value={adminPassword}
                        type="password"
                        id="password"
                        required
                      />
                      <label className={styles.passLabel} htmlFor="password">
                        Password
                      </label>
                    </div>
                    <input
                      className={styles.submitBtn}
                      type="submit"
                      value="LOGIN"
                    />
                    <p className={styles.changeUserLink} onClick={changeUser}>
                      Login as Teacher
                    </p>
                  </div>
                </form>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }



