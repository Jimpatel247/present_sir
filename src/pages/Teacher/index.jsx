import Head from "next/head";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/initFirebase";
import { useAuth } from "context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/teacher/teacher.module.css";
import Link from "next/link";

function TeacherDash() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [classData, setclassData] = useState([]);
  if (currentUser == null) {
    router.push("/auth/Login");
    return;
  }
  const q = query(
    collection(db, "Teachers"),
    where("email", "==", currentUser.email)
  );
  const getData = async () => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setclassData(doc.data().classes);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Head>
        <title>Teachers Dashboard</title>
      </Head>

      <div className="page-container">
        <div className={styles.links}>
          {classData.map((item, key) => {
            return (
              <Link key={key} href={`/Teacher/AddAttendance/${item.classId}`}>
                {item.sem}th sem {item.branch} {item.year}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TeacherDash;
