import React, { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    getNotesListOnce();
  };

  const deleteNote = (id) => {
    console.log("deleteNote-id: ", id);
    callDeleteApi(id);
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  };

  const getNotesListOnce = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/notes");
      setNotes(res.data);
      console.log("useEffect : " + res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateNoteList = (id, updateNote) => {
    setNotes((prevNotes) => {
      const updateNoteIndex = prevNotes.findIndex(
        (noteItem) => noteItem._id === id
      );
      prevNotes[updateNoteIndex].title = updateNote.title;
      prevNotes[updateNoteIndex].content = updateNote.content;
      return [...prevNotes];
    });
  };

  async function callDeleteApi(id) {
    try {
      const res = await axios.delete(`http://localhost:5500/api/note/${id}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  //effect to fetch all notes from database -- we will useEffect hook
  useEffect(() => {
    getNotesListOnce();
  }, [getNotesListOnce]);

  return (
    <div>
      <Provider store={store}>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={() => {
                deleteNote(noteItem._id);
              }}
              onUpdateList={updateNoteList}
            />
          );
        })}
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
