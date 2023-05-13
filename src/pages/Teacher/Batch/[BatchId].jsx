import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../../styles/teacher/addattendance.module.css";

function index() {
  const router = useRouter();
  const { BatchId } = router.query;

  return (
    <>
      <Head>
        <title>Batch</title>
      </Head>
      <div className="page-container">{BatchId}</div>
      <div className={styles.addAttendanceBtn}>
        <Link href={`/Teacher/AddAttendance/${BatchId}`}>+</Link>
      </div>
    </>
  );
}

export default index;
