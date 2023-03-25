import { useState } from "react";
import styles from "../../styles/teacher.module.css";

function index() {
  const [active, setActive] = useState(false);
  return (
    <div className="page-container">{active ? "Active" : "Not Active"}</div>
  );
}

export default index;
