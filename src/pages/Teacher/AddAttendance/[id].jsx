import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef } from "react";
import { db, auth } from "../../../firebase/initFirebase";
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
import styles from "../../../styles/teacher/addattendance.module.css";
import AddAttendanceCell from "components/AddAttendanceCell";
import Head from "next/head";

import { toast } from "react-toastify";
import { useAuth } from "context/AuthContext";
import middleWares from "@/middleWares";

function AddAttendance() {
  const router = useRouter();
  const dateRef = useRef();
  const dateRef2 = useRef();
  const { id } = router.query;
  //currentUser from context
  const { currentUser } = useAuth();
  const docRef = doc(db, "attendance", id);
  const batchRef = collection(db, "batch");
  const [subject, setSubject] = React.useState("");
  const [studentList, setStudentList] = React.useState([]);
  const [batchName, setBatchName] = React.useState("");

  const getList = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBatchName(docSnap.data().sem + "th Sem " + docSnap.data().branch);
      setSubject(docSnap.data().subject);
      const q = query(
        batchRef,
        where("branch", "==", docSnap.data().branch),
        where("sem", "==", docSnap.data().sem),
        where("year", "==", docSnap.data().year),
        where("students", "!=", null)
      );
      await getDocs(q)
        .then((querySnapshot) => {
          setStudentList([]);
          querySnapshot.forEach((docer) => {
            const students = docer.data().students;
            setStudentList([]);
            students.forEach((stu) => {
              setStudentList((studentData) => [
                ...studentData,
                {
                  en_no: stu.en_no,
                  name: stu.name,
                  isPresent: true,
                },
              ]);
            });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // docSnap.data() will be undefined in this case
    }
  };
  useEffect(() => {
    if (currentUser == null) {
      toast.info("Please Login to continue", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      router.push("/auth/Login");
    } else {
      getList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (e) => {
    const en_no = e.target.id;
    const newStudentList = studentList.map((student) => {
      if (student.en_no == en_no) {
        return {
          ...student,
          isPresent: !student.isPresent,
        };
      }
      return student;
    });
    setStudentList(newStudentList);
    console.log(studentList);
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    let date = dateRef.current.value;
    if (date === "") {
      date = new Date().toLocaleString();
    }
    var absent = [];
    studentList.forEach((stud) => {
      if (!stud.isPresent) {
        absent.push(stud.en_no);
      }
    });
    const attenRef = doc(db, "attendance", id);
    const newData = {
      absentNum: absent,
      dateTime: date,
    };
    const addData = async () => {
      await updateDoc(attenRef, {
        data: arrayUnion(newData),
      });
    };
    addData();
    router.push(`/Teacher`);
  };

  const uploadFromTexthandler = (e) => {
    e.preventDefault();
    var absent = e.target.textData.value.split(",");
    var pre = studentList[0]?.en_no.substring(0, 6);
    absent.forEach((n, i) => {
      if (n < 10) {
        absent[i] = pre + "0" + n;
      } else {
        absent[i] = pre + n;
      }
    });
    let date = dateRef2.current.value;
    if (date === "") {
      date = new Date().toLocaleString();
    }
    const attenRef = doc(db, "attendance", id);
    const newData = {
      absentNum: absent,
      dateTime: date,
    };
    const addData = async () => {
      await updateDoc(attenRef, {
        data: arrayUnion(newData),
      });
    };
    addData();
    router.push(`/Teacher`);
  };

  return (
    <>
      <Head>
        <title>Add Attendance</title>
      </Head>
      <div className="page-container">
        <h2 className={styles.heading}>
          {batchName} ({subject})
        </h2>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={uploadHandler}>
            <table>
              <thead>
                <tr>
                  <th>Enrollment No.</th>
                  <th className={styles.nameData}>Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, key) => (
                  <AddAttendanceCell
                    key={key}
                    en_no={student.en_no}
                    name={student.name}
                    isChecked={student.isPresent}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </tbody>
            </table>
            <div className={styles.btnCont}>
              <input type="date" ref={dateRef} />
              <button className={styles.btn} type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={uploadFromTexthandler} className={styles.form}>
            <h3>Upload from text</h3>
            <label className={styles.textAreaLabel} htmlFor="textData">
              Enter absent enrollment numbers seperated by comma:
            </label>
            <textarea
              className={styles.textArea}
              id="textData"
              placeholder="15,24,36,57..."
              cols="30"
              rows="10"
            ></textarea>
            <div className={styles.btnCont}>
              <input type="date" ref={dateRef} />
              <button className={styles.btn} type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default middleWares(AddAttendance);
