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

function Login() {
  const router = useRouter();
  const teacher = useRef(null);
  const admin = useRef(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [adminPassword, setAdminPassword] = useState();
  const [teacherLogin, setTeacherLogin] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { login, signup, currentUser, logout } = useAuth();

  async function submitHandler(e) {
    e.preventDefault();
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
      return;
    }
    if (isLoggingIn) {
      try {
        if (teacherLogin) {
          await login(email, password);
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
          router.push("/Teacher");
        }
      } catch (err) {
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
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      /> */}

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
