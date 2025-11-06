import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ next, prev, submit, progress }) {
  return (
    <div className={classes.progressBar}>
      {/* 🔙 Previous Button */}
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined">arrow_back</span>
      </div>

      {/* 📊 Progress Bar */}
      <div className={classes.rangeArea}>
        <div className={classes.tooltip}>{Math.floor(progress)}% Complete!</div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* ⏭️ Next / Submit Button */}
      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : next}
      >
        <span>{progress === 100 ? "Submit Quiz" : "Next Question"}</span>
        <span className="material-icons-outlined">
          {progress === 100 ? "check_circle" : "arrow_forward"}
        </span>
      </Button>
    </div>
  );
}
