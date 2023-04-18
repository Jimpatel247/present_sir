import { useRouter } from "next/router";
import React, { useEffect } from "react";
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

export default function AddAttendance() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { id } = router.query;
  const docRef = doc(db, "attendance", id);
  const batchRef = collection(db, "batch");
  const [subject, setSubject] = React.useState("");
  const [studentList, setStudentList] = React.useState([]);
  const [batchName, setBatchName] = React.useState("");

  const getList = async () => {
    const docSnap = await getDoc(docRef);
    setBatchName(docSnap.data().sem + "th Sem " + docSnap.data().branch);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
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
            // console.log(docer.id, " => ", docer.data());
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
          console.log(error);
        });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
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
      if (student.en_no === en_no) {
        return {
          ...student,
          isPresent: !student.isPresent,
        };
      }
      return student;
    });
    setStudentList(newStudentList);
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    const date = new Date();
    console.log(date);
    var absent = [];
    studentList.forEach((stud) => {
      if (!stud.isPresent) {
        absent.push(stud.en_no);
      }
    });
    console.log(absent);
    const attenRef = doc(db, "attendance", id);
    const newData = {
      absentNum: absent,
      dateTime: date,
    };
    console.log(newData);
    const addData = async () => {
      await updateDoc(attenRef, {
        data: arrayUnion(newData),
      });
    };
    addData();
    router.push("/Teacher");
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
