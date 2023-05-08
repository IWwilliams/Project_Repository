import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
  // const handleChange = (event) => {
  //   props.setTheater(event.target.value);
  // };

  return (
    <Box sx={{ m: 1, minWidth: 120 }}>
      <FormControl required>
        <InputLabel id="theater-select"></InputLabel>
        <Select
          labelId="theaterselect"
          id="theaterselect"
          value={props.current}
          onChange={props.setTheater}
          autoWidth
          label="Theater"
        >
          <MenuItem value={"Chinook"}>Chinook</MenuItem>
          <MenuItem value={"Shawnessy"}>Shawnessy</MenuItem>
          <MenuItem value={"Market"}>Market</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
