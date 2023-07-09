import React from "react";
import axios from "axios";
import CommonArea from "./CommonArea";

function CreateArea(props) {
  const submitNote = async (note) => {
    try {
      const res = await axios.post("http://localhost:5500/api/note", note);
      console.log(res);
      //update noteList to display all of the notes incl. new one
      props.onAdd(note);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CommonArea
        isEditMode={false}
        initNote={{ title: "", content: "" }}
        onUpdate={submitNote}
      />
    </>
  );
}

export default CreateArea;
