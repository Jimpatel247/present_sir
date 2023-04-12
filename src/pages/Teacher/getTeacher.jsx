import React from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import {auth, db } from "@/firebase/initFirebase";
const techerData=[];
export default function getTeacher() {
    
    async function queryData(){
        const q = query(collection(db, "Teachers"), where("email", "!=", null));
    
    const teacherSnapshot = await getDocs(q).catch((error) => {
     console.log(error);
    });
    console.log(teacherSnapshot.size)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data().name);
      
    })
    }  
        queryData();
  return (
    <>
        true;
    </>
  )
}
export var teacherData
