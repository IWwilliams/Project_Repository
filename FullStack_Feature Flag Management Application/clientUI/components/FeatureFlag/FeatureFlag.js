import autofiIcon from "../../public/autofi_icon.png";
import Image from "next/Image";
import React from "react";
import classes from '../../styles/FeatureFlagPage.module.css';
import Toggle from '../UI/Toggle'
import Button from "../UI/button";

export default function FeatureFlag(props) {

  return (
    <React.Fragment>
      <div>
        <div className={classes.title}>
          <h1>
            <Image src={autofiIcon} alt="AutoFi Icon" className={classes.img} />
            {props.name}
          </h1>
        </div>

        <div className={classes.toggle}>
          <Toggle state={props.value} toggleStateHandler={props.toggleStateHandler} />
        </div>

        <div className={classes.container}>
          <Button onClick={props.onSave}>Save</Button>
          <Button onClick={props.onReturn}>Home</Button>
        </div>
      </div>
    </React.Fragment>
  );
}
