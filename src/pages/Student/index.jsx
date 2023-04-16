import React from "react";
import Head from "next/head";

import styles from "../../styles/student/student.module.css";
import { useRouter } from "next/router";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Student() {
  const router = useRouter();
  const years = Array.from(
    { length: 5 },
    (v, i) => new Date().getFullYear() - i
  );
  const submitHandler = (e) => {
    e.preventDefault();
    sessionStorage.setItem("rollNo", e.target.rollNo.value);
    sessionStorage.setItem("branch", e.target.branch.value);
    sessionStorage.setItem("sem", e.target.sem.value);
    sessionStorage.setItem("admissionYr", e.target.admissionYr.value);
    router.push("/Student/CheckAttendance");
  };
  return (
    <>
      <Head>
        <title>Check Attendance</title>
      </Head>
      <div className="page-container">
        <div className={styles.container}>
          <div className={styles.form}>
            <form onSubmit={submitHandler}>
              <div className={styles.lottie}>
                <Player autoplay loop src="/student.json"></Player>
              </div>
              <h2>Check Attendance</h2>
              <div className={styles.fields}>
                <div className={styles.inputGrp}>
                  <input
                    className={styles.input}
                    type="text"
                    id="rollNo"
                    required
                  />
                  <label htmlFor="rollNo" className={styles.inputLabel}>
                    Roll No.(UIXXECXX)
                  </label>
                </div>
                <div className={styles.inputGrp}>
                  <select required name="branch" id="branch">
                    <option value="" selected disabled>
                      Select Branch
                    </option>
                    <option value="cse">CSE</option>
                    <option value="ece">ECE</option>
                  </select>
                </div>
                <div className={styles.inputGrp}>
                  <select required name="sem" id="sem">
                    <option value="" selected disabled>
                      Select Sem
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
                <div className={styles.inputGrp}>
                  <select required name="admissionYr" id="admissionYr">
                    <option value="" selected disabled>
                      Select Admission Year
                    </option>
                    {years.map((year, key) => (
                      <option key={key} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <input className={styles.submitBtn} type="submit" value="Go" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
