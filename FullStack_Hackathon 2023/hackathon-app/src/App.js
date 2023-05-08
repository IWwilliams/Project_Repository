import Root from "./pages/Root";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Flowsheets from "./pages/Flowsheets";
import NurseNotes from "./pages/NurseNotes";
import QR from "./pages/QR";
import Policy from "./pages/Policy";
import Lexicomp from "./pages/Lexicomp";
import Orders from "./pages/Orders";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PatientList from "./pages/PatientList";
import classes from "./App.module.css";
import Patient from "./pages/Patient";
import Documents from "./pages/Documents";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <Home /> },
      { path: "/flowsheet", element: <Flowsheets /> },
      { path: "/nursenotes", element: <NurseNotes /> },
      { path: "/qr", element: <QR /> },
      { path: "/policy", element: <Policy /> },
      { path: "/patientlist", element: <PatientList /> },
      { path: "/lexicomp", element: <Lexicomp /> },
      { path: "/orders", element: <Orders /> },
      { path: "/patient", element: <Patient /> },
      { path: "/documents", element: <Documents /> },
    ],
  },
]);

function App() {
  return (
    <div className={classes.app}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
