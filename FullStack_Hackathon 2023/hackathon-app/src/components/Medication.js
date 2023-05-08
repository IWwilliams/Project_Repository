import classes from "./Medication.module.css";
export default function Medication(props) {
  return (
    <div className={classes.medicationContainer}>
      <div className={classes.medicationContent}>
        <h2>{"Dosage"}</h2>
        <h2>{"Medication Name"}</h2>
      </div>
      {props.content.map((medication) => {
        return (
          <div className={classes.medicationContent}>
            <h2>{medication.name}</h2>
            <p>{medication.dosage}</p>
          </div>
        );
      })}
    </div>
  );
}
