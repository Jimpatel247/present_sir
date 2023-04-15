import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/login.module.css";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { db } from "@/firebase/initFirebase";
import Image from "next/image";

function Login() {
  const router = useRouter();
  const teacher = useRef(null);
  const admin = useRef(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [adminPassword, setAdminPassword] = useState();
  const [teacherLogin, setTeacherLogin] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { login, signup, currentUser, logout } = useAuth();

  async function submitHandler(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (isLoggingIn) {
      try {
        if (teacherLogin) {
          await login(email, password);
          router.push("/Teacher");
          console.log("sab changa si teacher sab");
        }
      } catch (err) {
        setError("Incorrect email or password");
      }
      return;
    }
    /* await signup(email, password) */
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
                  <input
                    className={styles.submitBtn}
                    type="submit"
                    value="LOGIN"
                  />
                  <p className={styles.changeUserLink} onClick={changeUser}>
                    Login as Admin
                  </p>
                </div>
              </form>
            </div>
            <div ref={admin} className={styles.admin}>
              <form>
                <Image
                  src="/teacher.svg"
                  alt="Admin"
                  width={150}
                  priority
                  height={150}
                />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
