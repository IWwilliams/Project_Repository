import { NavLink } from "react-router-dom";
import Page from "../components/Page";
import { useState } from "react";
import classes from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLoginFormValid = () => {
    return username === "Sara" && password === "swordfish";
  };
  return (
    <Page show={false}>
      <div className={classes.container}>
        <h1 className={classes.header}>LOGIN PAGE</h1>

        <form className={classes.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
        <NavLink to="/home">
          <button className={classes.button} disabled={!isLoginFormValid()}>
            LOGIN
          </button>
        </NavLink>
      </div>
    </Page>
  );
}
