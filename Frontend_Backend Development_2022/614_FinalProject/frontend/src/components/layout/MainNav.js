import { Link } from "react-router-dom";
import React, { useState } from "react";

import Modal from "../Modal";
import Backdrop from "../Backdrop";
import classes from "./MainNav.module.css";

function MainNav() {
  const [modalisOpen, setModalIsOpen] = useState(false);

  function openModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  async function getFetch(api) {
    let response = await fetch("http://localhost:8080/api/movie/theater/1");
    console.log(response);
    return response.json();
  }

  function loggedIn() {
    if (sessionStorage.loggeduser != null) {
      return (
        <React.Fragment>
          {"Welcome! " + sessionStorage.loggeduser}
        </React.Fragment>
      );
    }
  }

  return (
    <header className={classes.header}>
      <div>
        <img
          className={classes.logo}
          src={
            "https://rochester.kidsoutandabout.com/sites/default/files/themovies_20.jpg"
          }
          alt="Logo"
        />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Buy Ticket</Link>
          </li>

          <li>
            <Link to="/cancel">Cancel Ticket</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <p className={classes.login} onClick={openModalHandler}>
              Login
            </p>

            {modalisOpen ? (
              <Modal
                onCancel={closeModalHandler}
                onConfirm={closeModalHandler}
              />
            ) : null}
            {modalisOpen ? <Backdrop onCancel={closeModalHandler} /> : null}
          </li>
          <li>
            <p className={classes.welcome}>{loggedIn()}</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
