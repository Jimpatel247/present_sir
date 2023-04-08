import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/login.module.css";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { initializeApp } from 'firebase-admin/app';
const firebaseConfig = {
  /* apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID */
  apiKey: "AIzaSyBXwXMQ7Epmgzba2ImBjsIFYRMbR75Xh5w",
  authDomain: "presentsir-e6fb6.firebaseapp.com",
  projectId: "presentsir-e6fb6",
  storageBucket: "presentsir-e6fb6.appspot.com",
  messagingSenderId: "823548679196",
  appId: "1:823548679196:web:28f4f3c4690a8354223bd9",
  measurementId: "G-PHY752KXEQ"
  
};
var admin;
if (!firebase?.apps?.length) {
  admin= initializeApp(firebaseConfig );
 }
function Signup() {
  const router = useRouter()
  const teacher = useRef(null);
  const admin = useRef(null);
  const [email,setEmail] =useState();
  const [password,setPassword] =useState();
  const [teacherLogin, setTeacherLogin] = useState(true);
  const [error, setError] = useState(null)
  const [isLoggingIn, setIsLoggingIn] = useState(true)
  const { login, signup, currentUser } = useAuth()   
  async function submitHandler(e) {
    e.preventDefault()
    if (!email || !password) {
        setError('Please enter email and password')
        return
    }
    if (isLoggingIn) {
        try {

            console.log("ham he:")
            const temp=await admin.auth().getUserByEmail("admin3@gmail.com");
            console.log(temp);
            await signup(email, password)
            console.log(currentUser.uid);
            admin.auth().setCustomUserClaims(currentUser.uid, {
              admin: true,
            }).then(() => {
              return {
                message: `Success! ${data.email} has been made an admin.`,
              };
            }).catch((err) => {
              return err;
            });
            console.log(currentUser);
            
            router.push ("/Teacher")
            console.log("sab changa si1") 
        } catch (err) {
            setError('Incorrect email or password')
        }
        return
    }
    
} 
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="page-container">
        <div className={styles.container}>
          <div className={styles.box}>
            <div ref={teacher} className={styles.teacher}>
              <form onSubmit={submitHandler}>
                <img src="/teacher.svg" alt="Professor" />
                <h2>કેમ દોસ્ત મજામા Sign Up કરી લઇએ?</h2>
                <div className={styles.fields}>
                  <div className={styles.inputGrp}>
                    <input
                      className={styles.emailInput}
                      onChange={(e)=>setEmail(e.target.value)}
                      value={email}
                      type="text"
                      id="teacherEmail"
                      required
                    />
                    <label htmlFor="teacherEmail" className={styles.emailLabel}>
                      Email
                    </label>
                  </div>
                  <div className={styles.inputGrp}>
                    <input
                      className={styles.passInput}
                      onChange={(e)=>setPassword(e.target.value)}
                      value={password}
                      type="password"
                      id="teacherPassword"
                      required
                    />
                    <label
                      className={styles.passLabel}
                      htmlFor="teacherPassword"
                    >
                      Password ખાનગી સબ્દ તો નાખ 
                    </label>
                  </div>
                  <input
                    className={styles.submitBtn}
                    type="submit"
                    value="Sign Up"
                  />
                  
                </div> 
              </form>
            </div>
           {/*  <div ref={admin} className={styles.admin}>
              <form>
                <img src="/teacher.svg" alt="Admin" />
                <h2>Admin Login</h2>
                <div className={styles.fields}>
                  <div className={styles.inputGrp}>
                    <input
                      className={styles.emailInput}
                      onChange={(e)=>setAdminEmail(e.target.value)}
                      value={adminEmail}
                      type="text"
                      id="email"
                      required
                    />
                    <label htmlFor="email" className={styles.emailLabel}>
                      Email
                    </label>
                  </div>
                  <div className={styles.inputGrp}>
                    <input
                      className={styles.passInput}
                      onChange={(e)=>setAdminPassword(e.target.value)}
                      value={adminPassword}
                      type="password"
                      id="password"
                      required
                    />
                    <label className={styles.passLabel} htmlFor="password">
                      Password
                    </label>
                  </div>
                  <input
                    className={styles.submitBtn}
                    type="submit"
                    value="LOGIN"
                  />
                  <p className={styles.changeUserLink} onClick={changeUser}>
                    Login as Teacher
                  </p>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
