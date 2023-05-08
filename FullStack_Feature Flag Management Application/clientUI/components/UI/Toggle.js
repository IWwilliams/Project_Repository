import React, { useState } from "react";
import classes from "../../styles/toggle.module.css";

function Toggle(props) {
  const [toggleState, setToggleState] = useState(props.state);

  return (
    <React.Fragment>
      <label className={classes["toggle-label"]}>
        <input
          className={classes["toggle-input"]}
          type="checkbox"
          defaultChecked={toggleState}
          onClick={props.toggleStateHandler}
        ></input>
        <span className={classes["toggle-span"]} />
      </label>
    </React.Fragment>
  );
}
export default Toggle;
