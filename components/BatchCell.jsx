import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import styles from "../src/styles/components/batchCell.module.css";

export default function BatchCell({ branch, year, currentSem, subject }) {
  if (subject) {
    return (
      <div className={styles.batchItem}>
        <div className={styles.batchdata + " " + styles.dataForTeacher}>
          <div className={styles.batchItem__year}>
            {branch} ({year}) ({subject})
          </div>
          <div className={styles.batchItem__sem}>{currentSem}th Sem</div>
        </div>
        <IoIosArrowForward />
      </div>
    );
  }
  return (
    <div className={styles.batchItem}>
      <div className={styles.batchdata}>
        <div className={styles.batchItem__year}>
          {branch}({year})
        </div>
        <div className={styles.batchItem__sem}>{currentSem}th Sem</div>
      </div>
      <IoIosArrowForward />
    </div>
  );
}

export function Skeleton({ n }) {
  return (
    <>
      {Array(n)
        .fill()
        .map((_, i) => (
          <div className={styles.skeletonItem} key={i}>
            <div className={styles.skeleton}></div>
            <IoIosArrowForward />
          </div>
        ))}
    </>
  );
}
