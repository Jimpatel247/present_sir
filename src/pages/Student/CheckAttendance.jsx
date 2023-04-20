import ShowAttendanceCell from "components/ShowAttendanceCell";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "@/firebase/initFirebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";

import styles from "../../styles/student/showAttendance.module.css";

export default function CheckAttendance() {
  const data = [
    {
      subject: "VLSI",
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
  const [subjects, setSubjects] = useState([]);

  const formData = {
    rollNo: sessionStorage.getItem("rollNo"),
    branch: sessionStorage.getItem("branch"),
    sem: sessionStorage.getItem("sem"),
    admissionYr: sessionStorage.getItem("admissionYr"),
  };
  const atteRef = collection(db, "attendance");
  const getList = async () => {
    const q = query(
      atteRef,
      where("sem", "==", formData.sem),
      where("year", "==", formData.admissionYr),
      where("branch", "==", formData.branch)
    );
    await getDocs(q).then((querySnapshot) => {
      setSubjects([]);
      querySnapshot.forEach((sub) => {
        // console.log(sub.data());
        const list = sub.data().data;
        if (list.length != 0) {
          var abse = 0;
          list.forEach((curr) => {
            var found = curr.absentNum.find(function (element) {
              return element == formData.rollNo;
            });
            if (found) {
              abse++;
            }
          });
          const attended = list.length - abse;
          const newTeacher = {
            teacher: sub.data().teacher,
            total: list.length,
            attended,
          };
          // console.log(newTeacher)
          const ind = subjects.findIndex((ele) => {
            ele.subject == sub.data().subject;
          });
          if (ind != -1) {
            subjects[ind].teachers.push(newTeacher);
            subjects[ind].total += newTeacher.total;
            subjects[ind].attended += newTeacher.attended;

            setSubjects(subjects);
          } else {
            setSubjects((subjects) => [
              ...subjects,
              {
                subject: sub.data().subject,
                teachers: [newTeacher],
                total: newTeacher.total,
                attended: newTeacher.attended,
              },
            ]);
          }
        }
      });
    });
  };

  useEffect(() => {
    console.log(formData);
    getList();
    console.log("DATA: ", subjects);
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
        {subjects.map((item, key) => (
          <ShowAttendanceCell
            key={key}
            subject={item.subject}
            teachers={item.teachers}
            attended={item.attended}
            total={item.total}
          />
        ))}
      </div>
    </div>
  );
}
