import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { green } from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid(props) {

  function renderSeatPositions() {
    var colorz;
    return props.seatarray.map((seat) => {
      if (seat.state) {
        colorz = "388e3c";
      } else {
        colorz = "#b71c1c";
      }
      return (

        <Grid xs={2} key={seat['id']}>

          <Item
            key={seat}
            onClick={(e) => {
              props.setSeat({ seat });
            }}
          >
            {
              (seat["state"] == "true") ? (<><button className="True" id={seat['id'] + 500}>Taken</button></>) :
                (<><button className="False" id={seat['id'] + 500}>Available</button></>)
            }
            {/* <button id={seat['id'] + 500}>{seat["state"]}</button> */}
          </Item>
        </Grid>
      );
    });
  }

  return (
    <Box sx={{ flexGrow: 1, width: 800 }}>
      <h1>Please Pick a Seat</h1>
      <Grid container spacing={2} columns={10}>
        {renderSeatPositions()}
      </Grid>
    </Box>
  );
}
// (styles = StyleSheet.create({ btnstylehere: { backgroundColor: '388e3c' } })) :
// (styles = StyleSheet.create({ btnstylehere: { backgroundColor: '#b71c1c' } }))
