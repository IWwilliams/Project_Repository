import emailjs from "emailjs-com";
import React, { useReducer } from "react";
import classes from "./EmailFormTool.module.css";

const modalHandler = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ShowModal": {
      return { ...state, modalVisible: true, status: action.sendResponse };
    }
    case "HideModal": {
      return { ...state, modalVisible: false, status: null };
    }
  }
  return { ...state };
};

function EmailFormTool() {
  const [modal, dispatchModal] = useReducer(modalHandler, {
    status: false,
    modalVisible: false,
  });

  const sendEmail = (e) => {
    e.preventDefault();
    const response = emailjs
      .sendForm(
        "contact_service",
        "contact_form",
        e.target,
        "Wp5B8xCtLeyGDz3pF"
      )
      .then(
        (result) => {
          e.target.reset();
          console.log(result);
          return true;
        },
        (error) => {
          console.log(error.text);
          return false;
        }
      );
    dispatchModal({
      type: "ShowModal",
      sendResponse: response,
    });
  };

  return (
    <div className={classes.emailFormContainer}>
      {modal.modalVisible ? (
        <div className={classes.messageModal}>
          <div
            className={`${classes.symbol} ${
              modal.status ? classes.check : classes.x
            }`}
          >
            {modal.status ? (
              <div className={classes.check}>&#x2713;</div>
            ) : (
              <div className={classes.x}>&#10005;</div>
            )}
          </div>
          <div className={classes.modalMessage}>
            <p>
              {modal.status
                ? "Email Succesfully Sent"
                : "Sorry an error occured while sending the email."}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={sendEmail}>
          <h3 className={classes.title}> Email Form</h3>
          <div className={classes.formFields}>
            <div className={classes.NameEmailContainer}>
              <input
                className={classes.name}
                type="text"
                placeholder="Name"
                name="name"
                required
              />
              <input
                className={classes.email}
                type="email"
                placeholder="Email Address"
                name="email"
                required
              />
            </div>
            <input
              className={classes.subject}
              type="text"
              placeholder="Subject"
              name="subject"
              required
            />
            <textarea
              className={classes.message}
              id=""
              cols="30"
              rows="8"
              placeholder="Your message"
              name="message"
              required
            ></textarea>
          </div>
          <button type="submit" className={`${classes.Button}`}>
            <div className={`${classes["gg-mail"]}`}>
              <div className={classes.leftline}></div>
              <div className={classes.rightline}></div>
            </div>
            <p>Send</p>
          </button>
        </form>
      )}
    </div>
  );
}
export default EmailFormTool;
