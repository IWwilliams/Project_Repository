import React from "react";
import classes from "./button.module.css";
const Button = (props) => {
  const clickHandler = (event) => {
    event.preventDefault();
    props.onClick(props.ids);
  };
  return (
    <button
      onClick={clickHandler}
      onMouseEnter={props.onMouseEnter}
      className={`${classes.Button} ${props.className}`}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
