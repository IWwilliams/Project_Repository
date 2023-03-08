import { useRef } from "react";
import classes from "./Modal.module.css";

function Modal(props) {
  function cancelHandler() {
    props.onCancel();
  }
  function confirmHandler() {
    props.onConfirm();
  }

  async function getFetch(api) {
    let response = await fetch(api);
    console.log(response);
    if (!response.ok) {
      return;
    }
    let user = await response.json();
    sessionStorage.setItem("loggeduser", user.email);
    sessionStorage.setItem("loggedid", user.id);
    sessionStorage.setItem("loggedpass", user.pword);
    sessionStorage.setItem("loggedcc", user.cc);
    return;
  }

  const usernameRef = useRef();
  const passwordRef = useRef();

  async function formSubmit(e) {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    console.log(username, password);

    let API_URL =
      "http://localhost:8080/api/user/login/username/" +
      username +
      "/password/" +
      password;

    let user = await getFetch(API_URL);
    confirmHandler();
  }

  return (
    <div className={classes.modal}>
      <input type="text" required placeholder="username" ref={usernameRef} />
      <input type="text" required placeholder="password" ref={passwordRef} />
      <button onClick={formSubmit}>Confirm</button>
    </div>
  );
}

export default Modal;