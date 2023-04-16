import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function CheckAttendance() {
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
    }
  }, []);
  return (
    <div className="page-container">
      <Head>
        <title>My Attendance</title>
      </Head>
    </div>
  );
}
