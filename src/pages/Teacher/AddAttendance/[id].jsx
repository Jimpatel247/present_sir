import { useRouter } from "next/router";
import React from "react";

import styles from "../../../styles/teacher/addattendance.module.css";
import AddAttendanceCell from "components/AddAttendanceCell";

export default function AddAttendance() {
  const router = useRouter();
  const { id } = router.query;
  const [studentList, setStudentList] = React.useState([
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
  ]);

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
