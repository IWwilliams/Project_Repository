import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMemo } from "react";
import classes from "../../styles/DataTable.module.css";
import Button from "../UI/button";
import Link from "next/link";
/*
 * @file InitialFilters.js
 * @author [Isaiah]
 * @desc This component renders a data grid with columns for id, name, date, value, and toggle button.
 * @param {Object} props - The props passed to the component.
 * @param {Array} props.data - The data to be displayed in the grid.
 * @returns {React.Element} A React component that displays a data grid.
 * Testing a new merge
 */

export default function DataTable(props) {
  // Define an array to store the rows data
  let rows = [];
  let id = 0;
  console.log(props.data);
  // Use the useMemo hook to transform the props.data into the required format
  useMemo(() => {
    props.data.map((feature) => {
      rows.push({
        id: +id, // Convert the key to a number
        key: feature.key,
        name: feature.name,
        date: feature.lastUpdatedDate,
        description: feature.description,
        value: feature.value ? "On" : "Off",
        buttonVal: +feature.key, // Convert the key to a number
      });
      id++;
    });
  }, [props.data]);
  {
  }

  // Define the data for the grid
  const data = {
    columns: [
      { field: "id" },
      {
        field: "name",
        headerName: "Feature",
        flex: 1,
      },
      {
        field: "date",
        headerName: "Last Updated",
        type: "date",
        flex: 1,
      },
      {
        field: "description",
        headerName: "Description",
        flex: 1,
      },
      {
        field: "value",
        headerName: "State (On/Off)",
        flex: 1,
        // Render the cell with either a checkmark or an x based on the value
        renderCell: (params) => {
          return params.value === "On" ? (
            <div className={classes.check}>&#x2713;</div>
          ) : (
            <div className={classes.x}>&#10005;</div>
          );
        },
      },
      {
        field: "buttonVal",
        headerName: "Toggle",
        flex: 1,
        // Render the cell with a button
        renderCell: (params) => {
          // console.log(params.row.key);
          return (
            <Link
              className={classes.link}
              href={`feature-item/${params.row.key}`}
            >
              Update
            </Link>
          );
        },
      },
    ],
    rows: rows,
  };

  // Return the DataGrid component, with the given data and style
  return (
    <div style={{ height: 400, width: "90%", margin: "auto" }}>
      <DataGrid
        pageSize={5}
        rowsPerPageOptions={[5]}
        {...data}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}
