import Head from "next/head";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/initFirebase";
import { useAuth } from "context/AuthContext";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/teacher/teacher.module.css";
import Link from "next/link";
import BatchCell from "components/BatchCell";
import { Skeleton } from "components/BatchCell";

function TeacherDash() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [classData, setclassData] = useState([]);

  const getData = async () => {
    if (currentUser == null) {
      router.push("/auth/Login");
    } else {
      const q = query(
        collection(db, "Teachers"),
        where("email", "==", currentUser.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setclassData(doc.data().classes);
      });
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>Teachers Dashboard</title>
      </Head>

      <div className="page-container">
        <h1 className={styles.heading}>My Classes</h1>
        <div className={styles.container}>
          <div className={styles.links}>
            {classData.map((item, key) => {
              return (
                <Link key={key} href={`/Teacher/AddAttendance/${item.classId}`}>
                  <BatchCell
                    currentSem={item.sem}
                    branch={item.branch}
                    year={item.year}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDash;
