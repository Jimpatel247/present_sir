import styles from "../src/styles/components/showAttendanceCell.module.css";

export default function ShowAttendanceCell({ subject, attended, total }) {
  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <h3 className={styles.heading}>{subject}</h3>
        <p className={styles.ratio}>
          {attended}/{total}
        </p>
      </div>
      <div className={styles.line}>
        <Percentagebar n={(100 * attended) / total} />
        <p className={styles.percent}>{(100 * attended) / total}%</p>
      </div>
    </div>
  );
}

function Percentagebar({ n }) {
  var p = (12 * n - 360) / 7;
  if (p < 0) p = 0;
  return (
    <div className={styles.bar}>
      <div
        className={styles.barFill}
        style={{
          width: `${n}%`,
          backgroundColor: `hsl(${p},100%,50%)`,
        }}
      ></div>
    </div>
  );
}
