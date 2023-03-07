import { useRef } from "react";
import classes from "./Modal.module.css";
import axios from "axios";

function Modal(props) {
  console.log(props);
  function cancelHandler() {
    props.onCancel();
  }
  function confirmHandler() {
    props.onConfirm();
  }

  async function postPayment(api, data) {
    console.log(JSON.stringify(data));
    console.log(api);
    let response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    return response.json();
  }

  async function unregisteredAddUser(data) {
    console.log(JSON.stringify(data));
    let api = "http://localhost:8080/api/user/adduser";
    let response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  const ccRef = useRef();
  const emailRef = useRef();

  async function buySubmit(e) {
    e.preventDefault();

    const cc = ccRef.current.value;
    const email = emailRef.current.value;
    let registerRandoUserData = {
      email: email,
      cc: cc,
      pword: "*",
    };
    let flagunreg = 0;
    console.log(sessionStorage.loggeduser);
    if (sessionStorage.loggeduser === undefined) {
      let newuser = await unregisteredAddUser(registerRandoUserData);
      let newid = newuser.id;
      flagunreg = 1;
      sessionStorage.setItem("loggedid", newid);
    }

    console.log(sessionStorage.loggeduser);

    let API_URL = `http://localhost:8080/api/payment/addpayment/ticketid/${props.props.seat.seat.id}/userid/${sessionStorage.loggedid}`;
    let data = {
      price: 12.5,
    };

    let res = await postPayment(API_URL, data);
    if (flagunreg == 1) {
      sessionStorage.clear();
    }

    confirmHandler();
    props.props.handleTheaterChange("");
    props.props.handleMovieChange("");
    props.props.handleShowtimeChange("");
    props.props.handleSeatChange("");
    alert("Thank you for your purchase");
  }

  return (
    <div className={classes.modal}>
      <input type="text" required placeholder="CCNumber" ref={ccRef} />
      <input type="text" required placeholder="email" ref={emailRef} />
      <button onClick={buySubmit}>Confirm</button>
    </div>
  );
}

export default Modal;
