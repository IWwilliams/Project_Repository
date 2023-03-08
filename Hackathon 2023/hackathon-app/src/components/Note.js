import classes from "./Note.module.css";

export default function Note(props) {
  return (
    <div id={props.id} className={classes.container}>
      <p className={classes.date}>{props.date}</p>
      <p className={classes.note}>{props.note}</p>
    </div>
  );
}
