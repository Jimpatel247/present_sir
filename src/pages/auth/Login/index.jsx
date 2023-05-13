import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/login.module.css";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { db } from "@/firebase/initFirebase";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Cookies from "js-cookie";
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

function Login() {
  const router = useRouter();
  const teacher = useRef(null);
  const admin = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [teacherLogin, setTeacherLogin] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { login } = useAuth();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (Cookies.get("role") === "TeacherRole") {
      router.push("/Teacher");
    } else if (Cookies.get("role") === "adminRole24") {
      router.push("/Admin");
    }
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    setIsChecking(true);
    if (isLoggingIn) {
      try {
        if (teacherLogin) {
          if (!email || !password) {
            toast.error("Enter Email and Password", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setIsChecking(false);
            return;
          }
          const q = query(
            collection(db, "Teachers"),
            where("email", "==", email)
          );

          const querySnapshot = await getDocs(q);
          if (querySnapshot.size != 0) {
            await login(email, password).then(() => {
              Cookies.set("role", "teacherRole");
            });
            toast.success("Logged In Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setIsChecking(false);
            router.push("/Teacher");
          } else {
            toast.error("You are not a Teacher", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setIsChecking(false);
            router.push("/auth/Login");
          }
        } else {
          const q = query(
            collection(db, "admins"),
            where("mail_id", "==", adminEmail)
          );

          const querySnapshot = await getDocs(q);

          if (querySnapshot.size != 0) {
            await login(adminEmail, adminPassword).then(() => {
              Cookies.set("role", "adminRole24");
            });
            toast.success("Logged In Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setIsChecking(false);
            router.push("/Admin");
          } else {
            toast.error("You are not an Admin", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setIsChecking(false);
            router.push("/auth/Login");
          }
        }
      } catch (err) {
        console.log(err);
        toast.error("Incorrect Email or Password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setIsChecking(false);
      return;
    }
  }
  const changeUser = () => {
    if (teacherLogin) {
      teacher.current.style.left = "-100%";
      admin.current.style.left = "0%";
      setTeacherLogin(false);
    } else {
      teacher.current.style.left = "0%";
      admin.current.style.left = "100%";
      setTeacherLogin(true);
    }
  };
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
                <Image
                  src="/teacher.svg"
                  alt="Professor"
                  priority
                  width={150}
                  height={150}
                />
                <h2>Teacher Login</h2>
                <div className={styles.fields}>
                  <div className={styles.inputGrp}>
                    <input
                      className={styles.emailInput}
                      onChange={(e) => setEmail(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      id="teacherPassword"
                      required
                    />
                    <label
                      className={styles.passLabel}
                      htmlFor="teacherPassword"
                    >
                      Password
                    </label>
                  </div>
                  <button
                    disabled={isChecking}
                    className={styles.submitBtn}
                    type="submit"
                  >
                    {!isChecking && "Login"}
                    <div
                      className={styles.spinner}
                      data-ischecking={isChecking}
                    >
                      <svg viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20"></circle>
                      </svg>
                    </div>
                  </button>
                  <p className={styles.changeUserLink} onClick={changeUser}>
                    Login as Admin
                  </p>
                </div>
              </form>
            </div>
            <div ref={admin} className={styles.admin}>
              <form onSubmit={submitHandler}>
                <div className={styles.lottie}>
                  <Player autoplay loop src="/adminJSON.json"></Player>
                </div>
                <h2>Admin Login</h2>
                <div className={styles.fields}>
                  <div className={styles.inputGrp}>
                    <input
                      className={styles.emailInput}
                      onChange={(e) => setAdminEmail(e.target.value)}
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
                      onChange={(e) => setAdminPassword(e.target.value)}
                      value={adminPassword}
                      type="password"
                      id="password"
                      required
                    />
                    <label className={styles.passLabel} htmlFor="password">
                      Password
                    </label>
                  </div>
                  <button
                    disabled={isChecking}
                    className={styles.submitBtn}
                    type="submit"
                  >
                    {!isChecking && "Login"}
                    <div
                      className={styles.spinner}
                      data-ischecking={isChecking}
                    >
                      <svg viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20"></circle>
                      </svg>
                    </div>
                  </button>
                  <p className={styles.changeUserLink} onClick={changeUser}>
                    Login as Teacher
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
