import Head from "next/head";
import React, { useState } from "react";
import styles from "../../../styles/admin/batch.module.css";
import { read, utils } from "xlsx";

function Batch() {
  //badha teachers no data fetch karine niche na array ma store kari deje

  const teacherData = [
    {
      teacherName: "Jim Patel",
      initials: "JP",
    },
    {
      teacherName: "Manan Patel",
      initials: "MP",
    },
    {
      teacherName: "Saurav Lokhande",
      initials: "SL",
    },
    {
      teacherName: "Mayank Satapara",
      initials: "MS",
    },
    {
      teacherName: "Nitish Patel",
      initials: "NP",
    },
  ];

  const years = Array.from(
    { length: 5 },
    (v, i) => new Date().getFullYear() - i
  );
  const [branch, setBranch] = useState("CSE");
  const [yearOfAdmission, setYearOfAdmission] = useState(years[0]);
  const [semester, setSemester] = useState(1);
  const [subjects, setSubjects] = useState([{ subName: "", teacher: "" }]);
  const [fileData, setFileData] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const allowedFileTypes = [
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "text/csv", // .csv
  ];

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = utils.sheet_to_json(ws);
        setFileData(data);
      };
    } else {
      alert("Please select a valid Excel or CSV file.");
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    console.log(fileData);
    console.log(branch + yearOfAdmission + semester);
    console.log(subjects);
  };

  return (
    <>
      <Head>
        <title>Admin: New Batch</title>
      </Head>
      <div className="page-container">
        <div className={styles.container}>
          <h1 className={styles.title}>New Batch</h1>
          <div className={styles.form}>
            <input
              onChange={handleFileUpload}
              type="file"
              name="xlFile"
              id=""
            />
            <select
              value={yearOfAdmission}
              onChange={(e) => setYearOfAdmission(e.target.value)}
              name="yearOfAdmission"
              id=""
            >
              {years.map((year, key) => (
                <option key={key} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              name="branch"
              id=""
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
            </select>
            <label htmlFor="sem">Sem:</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              name="semester"
              id="sem"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="8">8</option>
            </select>
            <div className={styles.subject}>
              {subjects.map((subject, key) => (
                <div key={key} className={styles.subjectItem}>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject.subName}
                    onChange={(e) => {
                      const values = [...subjects];
                      values[key].subName = e.target.value;
                      setSubjects(values);
                    }}
                  />
                  <select
                    value={subject.teacher}
                    onChange={(e) => {
                      const values = [...subjects];
                      values[key].teacher = e.target.value;
                      setSubjects(values);
                    }}
                    name="subTeacher"
                    id=""
                  >
                    <option value="">Select Teacher</option>
                    {teacherData.map((teacher, key) => (
                      <option key={key} value={teacher.teacherName}>
                        {teacher.teacherName}({teacher.initials})
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                onClick={() =>
                  setSubjects([...subjects, { subName: "", teacher: "" }])
                }
              >
                +
              </button>
            </div>
            <button onClick={handleFileSubmit}>Upload</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Batch;
