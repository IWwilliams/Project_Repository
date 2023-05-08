import { getDefaultNormalizer, render } from "@testing-library/react";
import { useEffect, useRef, useState } from "react";
import classes from "./Register.module.css";
import Card from "../components/ui/Card";
import axios from "axios";

export default function CancelTicket() {
  let loading = true;
  const [posts, setPosts] = useState([]);
  let email = "";
  let pass = "";

  async function createStuff() {
    email = document.getElementById("email").value;
    pass = document.getElementById("pass").value;
    const response = await axios.get(
      `http://localhost:8080/api/user/login/username/${email}/password/${pass}`
    );
    loading = false;
    setPosts(response.data);
    console.log("here");
    console.log(posts);
  }

  async function submitRefund(ticketid) {
    console.log(ticketid);
    const URL = `http://localhost:8080/api/payment/remove/paymentId/${ticketid}`;

    const res = await fetch(URL, {
      method: "DELETE",
      mode: "cors",
      headers: { "Access-Control-Allow-Origin": "*" },
    }).catch((e) => console.error(e));
    createStuff();
    console.log(res);
  }

  if (posts.length !== 0) loading = false;
  return (
    <Card>
      <div>
        <div className={classes.control}>
          <label htmlFor="email">Enter Email To Find Your Ticket</label>
          <input type="text" required id="email" />
        </div>
        <div className={classes.control}>
          <label htmlFor="pass">Password</label>
          <input type="password" required id="pass" />
        </div>
        <button
          key=""
          onClick={(event) => {
            event.preventDefault();
            createStuff();
          }}
        >
          Submit
        </button>
        <div></div>
        <div>
          {loading ? (
            <section>
              <p>Submit To See Your Tickets</p>
            </section>
          ) : (
            <section>
              {posts.payments.map((payments) => (
                <div key={payments.ticket.id + 100}>
                  <p>
                    {payments.ticket.Movie +
                      " SEAT: R" +
                      payments.ticket.rowNum +
                      "C" +
                      payments.ticket.colNum +
                      " AT: " +
                      payments.ticket.Theater}
                  </p>
                  <button
                    onClick={(event) => {
                      submitRefund(payments.ticket.id);
                    }}
                  >
                    ^Cancel Ticket^
                  </button>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </Card>
  );
}
