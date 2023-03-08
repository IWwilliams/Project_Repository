import React, { useState } from "react";
import classes from '../../styles/Button.module.css';

import Card from "./Card";

const Button = (props) => {
  const clickHandler = (e) => {
    e.preventDefault();
    props.onClick();
  };

  return (
    <Card>
      <button onClick={clickHandler}  className={classes.button}>{props.children}</button>
    </Card>
  );
};

export default Button;
