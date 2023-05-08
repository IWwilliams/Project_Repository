import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Page from "../components/Page";
import Modal from "../components/Modal";
import { useLocation } from "react-router-dom";
import { useReducer } from "react";
import Medication from "../components/Medication";
import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import Appointments from "../components/Appointments";
import classes from "./Patient.module.css";
const modalHandlerController = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "Medications": {
      console.log("entered medication");
      return {
        ...state,
        modal: true,
        modalType: <Medication content={state.patient.medication}></Medication>,
      };
    }
    case "Contact Information": {
      console.log("entered call/text");
      return {
        ...state,
        modal: true,
        modalType: <Contact content={state.patient}></Contact>,
      };
    }
    case "Community Appointments": {
      console.log("entered Community Appointments");
      return {
        ...state,
        modal: true,
        modalType: (
          <Appointments
            content={state.patient.communityAppointments}
          ></Appointments>
        ),
      };
    }
    case "Community Appointments": {
      console.log("entered Community Appointments");
      return {
        ...state,
        modal: true,
        modalType: (
          <Appointments
            content={state.patient.communityAppointments}
          ></Appointments>
        ),
      };
    }
  }
  return { ...state, modal: false };
};

export default function Patient(props) {
  const patient = useLocation();
  const [modalHandler, dispatchmodalHandler] = useReducer(
    modalHandlerController,
    {
      modal: false,
      modalType: null,
      patient: patient.state.patient,
    }
  );

  const ButtonClickHandler = (event) => {
    console.log(event.target.innerHTML);
    dispatchmodalHandler({
      type: event.target.innerHTML,
    });
  };

  const cancel = () => {
    console.log("running");
    dispatchmodalHandler({});
  };

  return (
    <>
      <h1
        className={classes.name}
      >{`${patient.state.patient.name} ${patient.state.patient.lastName}`}</h1>
      {modalHandler.modal && (
        <Modal cancel={cancel}>{modalHandler.modalType}</Modal>
      )}
      <Button onClick={ButtonClickHandler}>Contact Information</Button>
      <Button onClick={ButtonClickHandler}>Medications</Button>
      <NavLink to="/flowsheet">
        <Button>Flowsheets</Button>
      </NavLink>
      <Button onClick={ButtonClickHandler}>Community Appointments</Button>
      <Link
        to="/nursenotes"
        state={{ content: patient.state.patient.nurseNotes }}
      >
        <Button>Nurse Notes</Button>
      </Link>
    </>
  );
}
