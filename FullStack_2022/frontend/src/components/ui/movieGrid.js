import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useState, useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function movieGrid(props) {
  // let showtimes = ["Monday 12:00", "Monday 2:00", "Monday 3:00"];
  let theater = sessionStorage.getItem("theaterchoice");

  // let [showtimes, setShowtimes] = useState("");
  // let [movielist, setMovielist] = useState("");
  // let [rendmovies, setrendMovies] = useState(false);
  // async function getShowtimes() {
  //   const response = await fetch(
  //     `http://localhost:8080/api/showtime/movie/${movie}`
  //   );
  //   setShowtimes(response.data);
  // }

  function renderShowtimes(i) {
    return props.moviearray[i].showtimes.map((item) => (
      <button
        key={item.id}
        onClick={(e) => {
          props.setShowTime(item.showTime);
          props.setShowTimeid(item.id);
          props.dostuff2();
        }}
      >
        {item.showTime}
      </button>
    ));
  }
  var today = new Date();
  //   setrendMovies(true);
  // }
  // function renderMovies() {
  //   return <img src={props.moviearray[0].image} key={props.moviearray[0].id}>{props.moviearray[0].name}</img>;
  return (
    <div>
      <h1>NOW PLAYING</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {(Date.parse(props.moviearray[0].releaseDate) < today) |
          (sessionStorage.loggeduser !== undefined) ? (
            <Grid xs={2}>
              <Item>
                <img
                  onClick={(e) => {
                    props.setMovie("How to Train your Dragon");
                    props.setPosts2("");
                  }}
                  height="300"
                  width="200"
                  src={props.moviearray[0].image}
                  key={props.moviearray[0].id}
                ></img>
                <ul>{renderShowtimes(0)}</ul>
              </Item>
            </Grid>
          ) : null}
          {(Date.parse(props.moviearray[1].releaseDate) < today) |
          (sessionStorage.loggeduser !== undefined) ? (
            <Grid xs={2}>
              <Item>
                <img
                  onClick={(e) => {
                    props.setMovie("X-Men");
                    props.setPosts2("");
                  }}
                  height="300"
                  width="200"
                  src={props.moviearray[1].image}
                  key={props.moviearray[1].id}
                ></img>
                <ul>{renderShowtimes(1)}</ul>
              </Item>
            </Grid>
          ) : null}
          {(Date.parse(props.moviearray[2].releaseDate) < today) |
          (sessionStorage.loggeduser !== undefined) ? (
            <Grid xs={2}>
              <Item>
                <img
                  onClick={(e) => {
                    props.setMovie("GoodFellas");
                    props.setPosts2("");
                  }}
                  height="300"
                  width="200"
                  src={props.moviearray[2].image}
                  key={props.moviearray[2].id}
                ></img>
                <ul>{renderShowtimes(2)}</ul>
              </Item>
            </Grid>
          ) : null}
          {(Date.parse(props.moviearray[3].releaseDate) < today) |
          (sessionStorage.loggeduser !== undefined) ? (
            <Grid xs={2}>
              <Item>
                <img
                  onClick={(e) => {
                    props.setMovie("Oceans 11");
                    props.setPosts2("");
                  }}
                  height="300"
                  width="200"
                  src={props.moviearray[3].image}
                  key={props.moviearray[3].id}
                ></img>
                <ul>{renderShowtimes(3)}</ul>
              </Item>
            </Grid>
          ) : null}
          {(Date.parse(props.moviearray[4].releaseDate) < today) |
          (sessionStorage.loggeduser !== undefined) ? (
            <Grid xs={2}>
              <Item>
                <img
                  onClick={(e) => {
                    props.setMovie("Avengers");
                    props.setPosts2("");
                  }}
                  height="300"
                  width="200"
                  src={props.moviearray[4].image}
                  key={props.moviearray[4].id}
                ></img>
                <ul>{renderShowtimes(4)}</ul>
              </Item>
            </Grid>
          ) : null}
          {(Date.parse(props.moviearray[5].releaseDate) < today) |
          (sessionStorage.loggeduser !== undefined) ? (
            <Grid xs={2}>
              <Item>
                <img
                  onClick={(e) => {
                    props.setMovie("Terminator 2");
                    props.setPosts2("");
                  }}
                  height="300"
                  width="200"
                  src={props.moviearray[5].image}
                  key={props.moviearray[5].id}
                ></img>
                <ul>{renderShowtimes(5)}</ul>
              </Item>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </div>
  );
}
