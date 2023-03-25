import React from "react";
import styles from "../../styles/admin.module.css";

function index() {
  return (
    <div className="page-container">
      <div className={styles.container}>
        <div className={styles.batches}></div>
        <div className={styles.sem}></div>
        <div className={styles.teachers}></div>
      </div>
    </div>
  );
}

export default index;
