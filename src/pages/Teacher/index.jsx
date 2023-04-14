import Head from "next/head";
import { collection, query, where, getDocs } from "firebase/firestore";
import {auth, db } from "@/firebase/initFirebase";
import { useAuth } from "context/AuthContext";
import { useState,useEffect} from "react";
import { useRouter } from "next/router";

function TeacherDash() {
  const router = useRouter();
  const {currentUser } = useAuth();
  if(!currentUser){
    alert("Plese Login");
    router.push("/auth/Login");
  }
  
    const q = query(collection(db, "Teachers"), where("email", "==", currentUser.email));
    console.log(currentUser);
    const [classData, setclassData] = useState([]);
    const getData = async () => {
      const querySnapshot = await getDocs(q);
      console.log("isi")
      querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().classes);
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

      <div className="page-container">Teacher Dashboard</div>
    </>
  );
}

export default TeacherDash;
