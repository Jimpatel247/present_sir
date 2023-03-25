import Head from "next/head";
import { useState } from "react";
import initFirebase from "@/firebase/initFirebase";

function TeacherDash() {
  initFirebase();
  // console.log(analytics);
  return (
    <>
      <Head>
        <title>Teachers Dashboard</title>
      </Head>

      <div className="page-container">Teacher Dashboard</div>
    </>
  );
}

export default TeacherDash;
