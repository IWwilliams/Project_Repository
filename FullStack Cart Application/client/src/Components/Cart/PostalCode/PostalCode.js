import classes from "./PostalCode.module.css";
import { useState, useEffect } from "react";
function PostalCode(props) {
  const [postalCodeInput, setPostalCodeInput] = useState(props.postal);

  const inputHandler = (event) => {
    setPostalCodeInput(event.target.value);
  };

  useEffect(() => {
    if (postalCodeInput) {
      const postalFormatted = postalCodeInput.trim().replace(" ", "");
      if (postalFormatted.length === 6) {
        props.setPostal(postalFormatted);
      }
    }
  }, [postalCodeInput]);

  return (
    <div className={classes.postalInput}>
      <div for="lable" className={classes.lable}>
        Postal Code:
      </div>
      <input
        name="lable"
        type="text"
        defaultValue={postalCodeInput}
        onChange={inputHandler}
      />
    </div>
  );
}
export default PostalCode;
