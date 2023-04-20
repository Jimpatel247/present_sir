import Head from "next/head";
import React, { useState, useEffect } from "react";
import { read, utils } from "xlsx";

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

import styles from "../../../styles/admin/batch.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";

function Batch() {
  const q = query(collection(db, "Teachers"), where("email", "!=", null));
  const [teacherData, setTeacherData] = useState([]);
  const getData = async () => {
    await getDocs(q)
      .then((querySnapshot) => {
        setTeacherData([]);
        querySnapshot.forEach((doc) => {
          setTeacherData((teacherData) => [
            ...teacherData,
            {
              name: doc.data().name,
              initials: doc
                .data()
                .name.split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase(),
            },
          ]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const years = Array.from(
    { length: 5 },
    (v, i) => new Date().getFullYear() - i
  );
  const [branch, setBranch] = useState("CSE");
  const [yearOfAdmission, setYearOfAdmission] = useState(years[0]);
  const [semester, setSemester] = useState(1);
  const [subjects, setSubjects] = useState([{ subName: "", teacher: "" }]);
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const allowedFileTypes = [
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "text/csv", // .csv
  ];

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFileName(selectedFile.name);
    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = utils.sheet_to_json(ws, { header: ["en_no", "name"] });
        data.shift();
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

    const batchRef = collection(db, "batch");
    const classRef = collection(db, "attendance");
    const teacherRef = collection(db, "Teachers");
    console.log(batchRef);
    try {
      const dataid = await addDoc(batchRef, {
        branch: branch,
        sem: semester,
        students: fileData,
        subjects: subjects,
        year: yearOfAdmission,
      })
        .then(async (dataid) => {
          console.log("Document written in batches with ID: ", dataid.id);
          subjects.forEach(async (docer) => {
            console.log(docer);
            const classData = await addDoc(classRef, {
              branch: branch,
              sem: semester,
              year: yearOfAdmission,
              subject: docer.subName,
              teacher: docer.teacher,
              data: [],
            })
              .then(async (classData) => {
                console.log(
                  "Document written in attendance with ID: ",
                  classData.id
                );
                const q = query(teacherRef, where("name", "==", docer.teacher));

                const querySnapshot = await getDocs(q);
                console.log(querySnapshot);
                const newData = {
                  branch: branch,
                  sem: semester,
                  year: yearOfAdmission,
                  subject: docer.subName,
                  classId: classData.id,
                };
                querySnapshot.forEach(async (dock) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(dock.id, " => ", dock.data());
                  const washingtonRef = doc(db, "Teachers", dock.id);
                  await updateDoc(washingtonRef, {
                    classes: arrayUnion(newData),
                  });
                  console.log("class added FOR", docer.teacher);
                });
              })
              .catch((error) => {
                console.log("Error in adding attendance");
                console.log(error);
              });
          });
        })
        .catch((error) => {
          console.log("Error in adding batch");
          console.log(error);
        });
    } catch (error) {
      console.error(error.message);
    }
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
            <div className={styles.group}>
              <div className={styles.formGrp}>
                <label htmlFor="yearOfAdmission">Year of Admission:</label>
                <select
                  value={yearOfAdmission}
                  onChange={(e) => setYearOfAdmission(e.target.value)}
                  name="yearOfAdmission"
                  id="yearOfAdmission"
                >
                  {years.map((year, key) => (
                    <option key={key} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGrp}>
                <label htmlFor="branch">Branch:</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  name="branch"
                  id="branch"
                >
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                </select>
              </div>
              <div className={styles.formGrp}>
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
                </select>
              </div>
            </div>
            <div className={styles.group2}>
              <div className={styles.subject}>
                {subjects.map((subject, key) => (
                  <div
                    key={key}
                    className={styles.subjectItem + " " + styles.formGrp}
                  >
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
                        <option key={key} value={teacher.name}>
                          {teacher.name}({teacher.initials})
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
              <label className={styles.fileUploadLabel} htmlFor="fileUpload">
                <AiOutlineCloudUpload className={styles.uploadIcon} />
                <p className={styles.text}>
                  {fileName ? fileName : "Browse files to upload"}
                </p>
                <input
                  onChange={handleFileUpload}
                  className={styles.fileInput}
                  type="file"
                  name="xlFile"
                  id="fileUpload"
                />
              </label>
            </div>

            <p className={styles.formatSpecifier}>
              *make sure that the file is in the following format
            </p>
          </div>
          <div className={styles.previewData}>
            <table>
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {fileData &&
                  fileData.map((student, key) => (
                    <tr key={key}>
                      <td>{student["en_no"]}</td>
                      <td>{student["name"]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className={styles.btnCont}>
              <button onClick={handleFileSubmit}>Add Batch</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Batch;
