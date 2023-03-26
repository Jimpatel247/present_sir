import Head from "next/head";
import React, { useState } from "react";
import styles from "../../../styles/admin/teacher.module.css";

function Teacher() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email);
  };
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
