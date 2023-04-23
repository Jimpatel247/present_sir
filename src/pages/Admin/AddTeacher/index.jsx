import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";

import { auth, db } from "@/firebase/initFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, collection, addDoc, query, where } from "firebase/firestore";

import styles from "../../../styles/admin/teacher.module.css";
import Image from "next/image";
import middleWares from "@/middleWares";

function Teacher() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  async function submitHandler(e) {
    e.preventDefault();
    if (!email || !name) {
      setError("Please enter email and password");
      return;
    }
    if (isLoggingIn) {
      var password = name + "@123";
      createUserWithEmailAndPassword(auth, email, password)
        .then(async function () {
          console.log("teacher add hogaya");
          const docRef = await addDoc(collection(db, "Teachers"), {
            email: email,
            name: name,
            classes: [],
          }).catch((err) => {
            console.log(err);
          });
          console.log(
            "Document written with ID(bolo Jay shree ram): ",
            docRef.id
          );
          router.push("/Admin");
        })
        .catch((error) => {
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
          <div className={styles.box}>
            <form onSubmit={submitHandler} className={styles.form}>
              <Image
                src="/teacher.svg"
                alt="Professor"
                priority
                width={150}
                height={150}
              />
              <h2>Enlist a new Teacher</h2>
              <div className={styles.fields}>
                <div className={styles.inputGrp}>
                  <input
                    className={styles.nameInput}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    required
                  />
                  <label className={styles.nameLabel} htmlFor="name">
                    Name
                  </label>
                </div>
                <div className={styles.inputGrp}>
                  <input
                    className={styles.emailInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    required
                  />
                  <label className={styles.emailLabel} htmlFor="email">
                    Email
                  </label>
                </div>
                <input
                  className={styles.submitBtn}
                  type="submit"
                  value="Add Teacher"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default middleWares(Teacher);
