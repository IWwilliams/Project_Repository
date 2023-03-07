import { NavLink } from "react-router-dom";
import Page from "../components/Page";
import Button from "../components/Button";
import classes from "./Home.module.css";

export default function Home() {
  return (
    <Page show={false}>
      <h1 className={classes.home}>HOME PAGE</h1>
      <div className={classes.buttonContainer}>
        <NavLink to="/qr">
          <Button>QR SCAN</Button>
        </NavLink>
        <NavLink to="/patientlist">
          <Button>PATIENT LIST</Button>
        </NavLink>
        <NavLink to="/policy">
          <Button>POLICY</Button>
        </NavLink>
        <NavLink to="/lexicomp">
          <Button>LEXICOMP</Button>
        </NavLink>
        <NavLink to="/orders">
          <Button>ORDERS</Button>
        </NavLink>
        <NavLink>
          <Button>EMAR</Button>
        </NavLink>
        <NavLink to="/documents">
          <Button>DOCUMENTS</Button>
        </NavLink>
      </div>
    </Page>
  );
}
