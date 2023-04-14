import React from "react";
import styles from "../src/styles/teacher/addattendance.module.css";

export default function AddAttendanceCell({
  en_no,
  name,
  handleCheckboxChange,
  isChecked,
}) {
  return (
    <tr>
      <td>{en_no}</td>
      <td>{name}</td>
      <td>
        <label className={styles.switch} htmlFor={en_no}>
          <input
            type="checkbox"
            id={en_no}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className={styles.slider}>{isChecked ? "P" : "A"}</span>
        </label>
      </td>
    </tr>
  );
}
