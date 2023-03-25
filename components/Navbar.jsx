import Link from "next/link";
import { useState } from "react";
import styles from "../src/styles/components/navbar.module.css";
import { RiMenu3Line } from "react-icons/ri";

function Navbar() {
  const [active, setActive] = useState(false);
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <Link href={"/"}>Home</Link>
        </div>
        <div>
          <RiMenu3Line
            onClick={() => setActive(!active)}
            className={styles.ham}
          />
        </div>
        <div
          className={
            styles.navbar__links +
            " " +
            (active ? styles.navbar__links_active : "")
          }
        >
          <div className={styles.linkGrp}>
            <Link href={"/auth/login"}>Login</Link>
            <Link href={"/auth/login"}>Login</Link>
            <Link className={styles.lastLink} href={"/auth/login"}>
              Login
            </Link>
          </div>
          <div className={styles.linkGrp}>
            <Link href={"/auth/login"}>Login</Link>
            <Link href={"/auth/login"}>Login</Link>
            <Link className={styles.lastLink} href={"/auth/login"}>
              Login
            </Link>
          </div>
        </div>
      </nav>
      <div className={styles.buffer}></div>
    </>
  );
}

export default Navbar;
