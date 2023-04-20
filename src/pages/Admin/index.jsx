import { useEffect, useState } from "react";
import styles from "../../styles/admin/admin.module.css";
import { IoIosArrowForward } from "react-icons/io";
import Head from "next/head";
import Link from "next/link";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/initFirebase";
import BatchCell, { Skeleton } from "components/BatchCell";

function AdminDash() {
  const q = query(collection(db, "Teachers"), where("email", "!=", null));
  const q1 = query(collection(db, "batch"), where("branch", "!=", null));
  const [teacherData, setTeacherData] = useState([]);
  const [batchData, setBatchData] = useState([]);
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
              year: doc.data().year,
              currentSem: doc.data().sem,
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
    getBatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <BatchCell
                key={key}
                currentSem={batch.currentSem}
                year={batch.year}
                branch={batch.branch}
              />
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
            {/* <Skeleton n={5} /> */}
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
