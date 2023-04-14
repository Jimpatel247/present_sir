import { useEffect, useState } from "react";
import styles from "../../styles/admin.module.css";
import { IoIosArrowForward } from "react-icons/io";
import Head from "next/head";
import Link from "next/link";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/initFirebase";



function AdminDash() {

  const q = query(collection(db, "Teachers"), where("email", "!=", null));
  const q1 = query(collection(db, "batch"), where("branch", "!=", null));
  const [teacherData, setTeacherData] = useState([]);
  const [batchData,setBatchData]=useState([]);
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

  const getBatch = async () => {
    await getDocs(q1)
      .then((querySnapshot) => {
        setBatchData([]);
        querySnapshot.forEach((doc) => {
          setBatchData((batchData) => [
            ...batchData,
            {
              branch: doc.data().branch,
              year:doc.data().year,
              currentSem:doc.data().sem
            },
          ]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
useEffect(()=>{

getData();
getBatch();
},[])
 

  /* const batchData = [
    {
      branch: "ECE",
      year: 2019,
      currentSem: 8,
    },
    {
      branch: "CSE",
      year: 2019,
      currentSem: 8,
    },
    {
      branch: "ECE",
      year: 2020,
      currentSem: 6,
    },
    {
      branch: "CSE",
      year: 2020,
      currentSem: 6,
    },
    {
      branch: "ECE",
      year: 2021,
      currentSem: 4,
    },
    {
      branch: "CSE",
      year: 2021,
      currentSem: 4,
    },
    {
      branch: "ECE",
      year: 2022,
      currentSem: 2,
    },
    {
      branch: "CSE",
      year: 2022,
      currentSem: 2,
    },
  ];
 */
  /* const teacherData = [
    {
      name: "Jim Patel",
      initials: "JP",
    },
    {
      name: "Manan Patel",
      initials: "MP",
    },
    {
      name: "Saurav Lokhande",
      initials: "SL",
    },
    {
      name: "Mayank Satapara",
      initials: "MS",
    },
  ]; */
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="page-container">
        <div className={styles.container}>
          <div className={styles.batch}>
            <div className={styles.header}>
              <p>filter</p>
              <button>
                <Link className={styles.link} href={"/Admin/AddBatch"}>
                  + Add batch
                </Link>
              </button>
            </div>
            {batchData.map((batch, key) => (
              <div className={styles.batchItem} key={key}>
                <div className={styles.batchdata}>
                  <div className={styles.batchItem__year}>
                    {batch.branch}({batch.year})
                  </div>
                  <div className={styles.batchItem__sem}>
                    {batch.currentSem}th Sem
                  </div>
                </div>
                <IoIosArrowForward />
              </div>
            ))}
          </div>
          <div className={styles.sem}>
            <div className={styles.header}>
              <p>filter</p>
              <button>
                <Link className={styles.link} href={"/Admin/AddAdmin"}>
                  + Add Admin
                </Link>
              </button>
            </div>
          </div>
          <div className={styles.teacher}>
            <div className={styles.header}>
              <p>filter</p>
              <button>
                <Link className={styles.link} href={"/Admin/AddTeacher"}>
                  + Add Teacher
                </Link>
              </button>
            </div>
            {teacherData?.map((teacher, key) => (
              <div className={styles.teacherItem} key={key}>
                {teacher.name} ({teacher.initials})
                <IoIosArrowForward />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDash;
