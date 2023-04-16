import Link from "next/link";
import { useState } from "react";
import styles from "../src/styles/components/navbar.module.css";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [active, setActive] = useState(false);
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <Link href={"/"}>Home</Link>
        </div>
        <div>
          {active ? (
            <IoMdClose
              onClick={() => setActive(!active)}
              className={styles.ham}
            />
          ) : (
            <RiMenu3Line
              onClick={() => setActive(!active)}
              className={styles.ham}
            />
          )}
        </div>
        <div
          className={
            styles.navbar__links +
            " " +
            (active ? styles.navbar__links_active : "")
          }
        >
          <div className={styles.linkGrp}>
            <Link onClick={() => setActive(!active)} href={"/Teacher"}>
              Teacher Dashboard
            </Link>
            <Link onClick={() => setActive(!active)} href={"/Admin"}>
              Admin DashBoard
            </Link>
          </div>
          <div className={styles.linkGrp}>
            <Link
              onClick={() => setActive(!active)}
              // className={styles.lastLink}
              href={"/auth/Login"}
            >
              Login
            </Link>
            <Link
              onClick={() => setActive(!active)}
              className={styles.lastLink}
              href={"/Student"}
            >
              Student
            </Link>
          </div>
        </div>
      </nav>
      <div className={styles.buffer}></div>
    </>
  );
}

export default Navbar;
