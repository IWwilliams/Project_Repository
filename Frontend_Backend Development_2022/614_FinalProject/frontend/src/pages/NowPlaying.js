import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useState, useEffect } from "react";
import DropDown from "../components/ui/theaterSelect";
import MovieGrid from "../components/ui/movieGrid";
import SeatGrid from "../components/ui/seatGrid";
import classes from "./NowPlaying.css";
import Payment from "./Payment";
import Card from "../components/ui/Card";
import axios from "axios";
import { chainPropTypes } from "@mui/utils";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

window.addEventListener("load", async function (evt) {
  evt.preventDefault();
  sessionStorage.clear();
});

function NowPlaying() {
  // let theater_names = ["chinook", "Shawnessy", "MarketMall"];
  const [posts, setPosts] = useState([]);
  const [posts2, setPosts2] = useState([]);
  const [theater, setTheater] = useState("");
  const [movie, setMovie] = useState("");
  const [showtime, setShowTime] = useState("");
  const [seat, setSeat] = useState("");
  const [seat1, setSeat1] = useState(true);
  const [showtimeid, setShowTimeid] = useState(1);
  const [dummy, setDummy] = useState(true);
  let [loggedin, setLogged] = useState(false);

  let handleTheaterChange = (e) => {
    sessionStorage.setItem("theaterchoice", e.target.value);
    setTheater(e.target.value);
  };

  let handleMovieChange = (movieTitle) => {
    setMovie(movieTitle);
    console.log(movie);
  };

  let handleShowtimeChange = (showtime) => {
    setShowTime(showtime);
    setDummy(false);
    sessionStorage.setItem("showtimeChoice", showtime);
  };

  let handleSeatChange = (seat) => {
    setSeat(seat);
    console.log(seat);
  };

  if (posts.length === 0) {
    dostuff();
  }
  // if (posts2.length === 0) {
  //   dostuff2();
  // }
  async function dostuff() {
    let response = await getFetch("http://localhost:8080/api/movie/theater/1");
    var myarray = response.map((result) => {
      return JSON.parse(result);
    });
    setPosts(myarray);
  }
  async function dostuff2() {
    let response = await getFetch(
      `http://localhost:8080/api/ticket/showtime/${showtimeid}`
    );
    var myarray = response.map((result) => {
      return JSON.parse(result);
    });
    setPosts2(myarray);
  }
  async function getFetch(api) {
    let response = await fetch(api);
    console.log(response);
    return response.json();
  }

  function renderMovies() {
    if ((theater != "") & (posts.length != 0)) {
      return (
        <MovieGrid
          dostuff2={dostuff2}
          setShowTimeid={setShowTimeid}
          setPosts2={setPosts2}
          moviearray={posts}
          setMovie={handleMovieChange}
          setShowTime={handleShowtimeChange}
        ></MovieGrid>
      );
    }
  }

  function renderSeats() {
    if ((showtime !== "") & (posts2.length != 0)) {
      return (
        <div>
          <SeatGrid
            seatarray={posts2}
            seatflag={seat1}
            setSeat={handleSeatChange}
          ></SeatGrid>
        </div>
      );
    }
  }

  function renderPayment() {
    if (seat !== "") {
      return (
        <div>
          <Payment
            handleTheaterChange={setTheater}
            handleShowtimeChange={setShowTime}
            handleMovieChange={setMovie}
            handleSeatChange={setSeat}
            theater={theater}
            showtime={showtime}
            seat={seat}
            movie={movie}
          ></Payment>
        </div>
      );
    }
  }

  return (
    <div>
      <p>Pick a Theater!</p>
      <DropDown setTheater={handleTheaterChange} current={theater}></DropDown>
      {renderMovies()}
      <div>
        {<div className="center">{renderSeats()}</div>}
        {renderPayment()}
        {/* <div>{(sessionStorage.loggeduser !== undefined) ? <button onClick={setLogged(true)}>Show Pre Releases</button> : null}</div> */}
      </div>
    </div>
  );
}

export default NowPlaying;
// {/* <div className="center">{renderPayment()}</div> */}
