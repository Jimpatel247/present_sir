import { useRef, useState } from "react";
import styles from "../../styles/login.module.css";

function login() {
  const teacher = useRef(null);
  const admin = useRef(null);
  const [teacherLogin, setTeacherLogin] = useState(true);
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
    <div className="page-container">
      <div className={styles.container}>
        <div className={styles.box}>
          <div ref={teacher} className={styles.teacher}>
            <button onClick={changeUser}>Login as Admin</button>
            <form>
              <h2>Teacher Login</h2>
              <div className={styles.fields}>
                <div className={styles.inputGrp}>
                  <input
                    className={styles.emailInput}
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
                    type="password"
                    id="teacherPassword"
                    required
                  />
                  <label className={styles.passLabel} htmlFor="teacherPassword">
                    Password
                  </label>
                </div>
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
          <div ref={admin} className={styles.admin}>
            <button onClick={changeUser}>Login as Teacher</button>
            <form>
              <h2>Admin Login</h2>
              <div className={styles.fields}>
                <div className={styles.inputGrp}>
                  <input
                    className={styles.emailInput}
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
                    type="password"
                    id="password"
                    required
                  />
                  <label className={styles.passLabel} htmlFor="password">
                    Password
                  </label>
                </div>
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
