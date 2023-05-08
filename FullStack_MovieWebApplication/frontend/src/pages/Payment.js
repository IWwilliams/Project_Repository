import Card from "../components/ui/Card";
import Paymentmodal from "../components/Paymentmodal";
import Backdrop from "../components/Backdrop";
import { useEffect, useRef, useState } from "react";

export default function Payment(props) {
  const [modalisOpen, setModalIsOpen] = useState(false);

  function openModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <Card>
      <div>
        <h3>Ticket Details:</h3>
        <p>{props.theater}</p>
        <p>{props.movie}</p>
        <p>
          {"SHOWTIME:\t[" + props.seat.seat.showtime + "]  "}
          <p>
            {"SEAT:\t[ROW: " +
              props.seat.seat.rowNum +
              "    COL: " +
              props.seat.seat.colNum +
              "]  "}
          </p>
          <p>{"TICKETID\t[" + props.seat.seat.id + "]"}</p>
        </p>
        <button onClick={openModalHandler}>Purchase NOW</button>
        {modalisOpen ? (
          <Paymentmodal
            props={props}
            onCancel={closeModalHandler}
            onConfirm={closeModalHandler}
          />
        ) : null}
        {modalisOpen ? <Backdrop onCancel={closeModalHandler} /> : null}
      </div>
    </Card>
  );
}
