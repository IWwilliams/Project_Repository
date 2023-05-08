import Card from "../components/ui/Card";
import classes from "./RegisterForm.module.css";
import { useRef, useState } from "react";

function RegisterForm(props) {
  const fnameInputRef = useRef();
  const lnameInputRef = useRef();
  const emailInputRef = useRef();
  const ccInputRef = useRef();
  const passwordInputRef = useRef();
  const addressInputRef = useRef();

  let [posted, setPosted] = useState(false);

  async function getFetch(api, data) {
    console.log(api)
    console.log(JSON.stringify(data))
    let response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        data
      )
    });
    console.log(response);
    setPosted(true);
    return;
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredemail = emailInputRef.current.value;
    const enteredfname = fnameInputRef.current.value;
    const enteredlname = lnameInputRef.current.value;
    const enteredcc = ccInputRef.current.value;
    const enteredpass = passwordInputRef.current.value;
    const enteredaddress = addressInputRef.current.value;

    let registerData = {
      email: enteredemail,
      fname: enteredfname,
      lname: enteredlname,
      address: enteredaddress,
      cc: enteredcc,
      pword: enteredpass,
    };

    let API_URL = "http://localhost:8080/api/user/adduser";
    let res = await getFetch(API_URL, registerData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="text" required id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="fname">First Name</label>
          <input type="text" required id="fname" ref={fnameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="lname">Last Name</label>
          <input type="text" required id="lname" ref={lnameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="cc">CreditCard</label>
          <input type="text" required id="cc" ref={ccInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="pass">Password</label>
          <input type="text" required id="pass" ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Register!</button>
        </div>
        {posted ? <p>Congrats on Registering</p> : null}
      </form>
    </Card>
  );
}

export default RegisterForm;
