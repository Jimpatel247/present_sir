import ShowAttendanceCell from "components/ShowAttendanceCell";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import styles from "../../styles/student/showAttendance.module.css";

export default function CheckAttendance() {
  const data = [
    {
      subject: "VLSI",
      total: 50,
      attended: 50,
    },
    {
      subject: "Microprocessor",
      total: 50,
      attended: 18,
    },
    {
      subject: "Computer Networks",
      total: 50,
      attended: 36,
    },
  ];
  const router = useRouter();
  const formData = {
    rollNo: sessionStorage.getItem("rollNo"),
    branch: sessionStorage.getItem("branch"),
    sem: sessionStorage.getItem("sem"),
    admissionYr: sessionStorage.getItem("admissionYr"),
  };
  useEffect(() => {
    console.log(formData);
    if (
      !formData.rollNo ||
      !formData.branch ||
      !formData.sem ||
      !formData.admissionYr
    ) {
      router.push("/Student");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="page-container">
      <Head>
        <title>My Attendance</title>
      </Head>
      <h2 className={styles.heading}>My Attendance</h2>
      <div className={styles.container}>
        {data.map((item, key) => (
          <ShowAttendanceCell
            key={key}
            subject={item.subject}
            attended={item.attended}
            total={item.total}
          />
        ))}
      </div>
    </div>
  );
}
