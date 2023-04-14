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

export default function AddAttendance() {
  const router = useRouter();
  const { id } = router.query;
  const docRef = doc(db, "attendance", "2bG78VtuaAMuuzJ6y9dl");
  const batchRef=collection(db,"batch");
  const [studentList, setStudentList] = React.useState([]);
  const getList = async () => {
    const docSnap = await getDoc(docRef);
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
          const students=docer.data().students;
          setStudentList([]);
          students.forEach((stu)=>{
            setStudentList((studentData) => [
              ...studentData,
              {
                en_no:stu.en_no,
                name:stu.name,
                isPresent:true
              },
            ]);
          })
          
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
    getList();
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
    console.log(studentList);
  };

  const temp=[
    {
      en_no: "UI20CS01",
      name: "Abhishek Kumar",
      isPresent: true,
    },
    {
      en_no: "UI20CS02",
      name: "Aditya Rathore ",
      isPresent: true,
    },
    {
      en_no: "UI20CS03",
      name: "Akhil Sharma",
      isPresent: true,
    },
    {
      en_no: "UI20CS04",
      name: "Alok Kumar",
      isPresent: true,
    },
    {
      en_no: "UI20CS05",
      name: "Aman Garg",
      isPresent: true,
    },
    {
      en_no: "UI20CS06",
      name: "Anirudh Paliwal ",
      isPresent: true,
    },
    {
      en_no: "UI20CS07",
      name: "Ankit Baghel",
      isPresent: true,
    },
    {
      en_no: "UI20CS08",
      name: "Anshika Agarwal",
      isPresent: true,
    },
    {
      en_no: "UI20CS09",
      name: "Aryaman Gurjar",
      isPresent: true,
    },
    {
      en_no: "UI20CS10",
      name: "Ayush Kumar",
      isPresent: true,
    },
  ]
  return (
    <div>
      {id}
      <div className={styles.formContainer}>
        <form onSubmit={uploadHandler}>
          <table>
            <thead>
              <tr>
                <th>Enrollment No.</th>
                <th>Name</th>
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
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
