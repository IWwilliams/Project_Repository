import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import Note from "../components/Note";
import Page from "../components/Page";
import classes from "./NurseNotes.module.css";
import { useLocation } from "react-router-dom";

export default function NurseNotes(props) {
  const [notesArray, setNotesArray] = useState([]);
  const [value, setValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });
  const content = useLocation();
  console.log(content.state.content);

  useEffect(() => {
    const temp = [];

    content.state.content.forEach((note) => {
      temp.push(<Note date={note.date} note={note.note} key={Math.random()} />);
    });
    setNotesArray(temp);
    console.log("Effect RAN");
  }, []);
  // console.log(NOTES);

  const onSave = () => {
    const newNote = (
      <Note date={"2023-03-04"} note={value} key={Math.random()} />
    );
    setNotesArray([...notesArray, newNote]);
    setValue("");
  };

  const onClear = () => {
    setValue("");
  };

  const onSearchClear = () => {
    setFilterValue("");
  };

  // const onFilterClear

  return (
    <Page>
      <h2 className={classes.header}>Add New Note</h2>
      <div className={classes.addNoteContainer}>
        <textarea
          placeholder="Add a note here"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <div className={classes.buttonContainer}>
          <button onMouseDown={listen}>🎤 Start</button>
          <button onMouseDown={stop}>🎤 Stop</button>
          <button onClick={onSave}>Save</button>
          <button onClick={onClear}>Clear</button>
        </div>
      </div>
      <h3>Historic Notes</h3>
      <div className={classes.filterContainer}>
        <textarea
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          placeholder="Filter by note"
        ></textarea>
        <button onClick={onSearchClear}>Clear</button>
      </div>
      <div>
        {notesArray.filter((note) =>
          note.props.note.toLowerCase().includes(filterValue.toLowerCase())
        )}
      </div>
    </Page>
  );
}
