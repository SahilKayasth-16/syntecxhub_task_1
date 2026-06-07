import React from "react";
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (note.trim() === "") {
      return;
    }
    setNotes([...notes, note]);
    setNote("");

    inputRef.current.focus();
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    
    setNotes(updatedNotes);
  };

  const editNote = (index) => {
    setNote(notes[index]);
    setEditIndex(index);

    inputRef.current.focus();
  };

  const updateNote =() => {
    const updatedNotes = [...notes];

    updatedNotes[editIndex] = note;

    setNotes(updatedNotes);
    setNote("");
    setEditIndex(null);

    inputRef.current.focus();
  };
  
  return (
    <div className="container">
      <h1>Notes App</h1>

      <p className="count"> Total Notes: {notes.length}</p>

      <input type="text" ref={inputRef} value={note} placeholder="Enter Value" onChange={(e) => setNote(e.target.value)} />
      {
        editIndex === null ? (
          <button onClick={addNote}>Add Note</button>
        ) : (
          <button onClick={updateNote}>Update Note</button>
        )
      }
      <ul>
        {notes.map((item, index) => (
          <li key={index}>
            {item}

            <div className="btn-group">
              <button className="delete-ntn" onClick={() => deleteNote(index)}>Delete</button>
              <button className="edit-btn" onClick={() => editNote(index)}>Edit</button>
            </div>
          </li>    
        ))}
      </ul>
    </div>
  );
}

export default App;