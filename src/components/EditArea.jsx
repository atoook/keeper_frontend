import React from "react";
import axios from "axios";
import CommonArea from "./CommonArea";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function EditArea(props) {
  console.log(`props.id : ${props.id}`);
  const updateNote = async (note) => {
    try {
      const res = await axios.put(
        `http://localhost:5500/api/note/${props.id}`,
        note
      );
      props.onUpdateList(props.id, res.data);
    } catch (err) {
      console.log(err);
    }
    props.onClose();
  };

  return (
    <div className="edit">
      <CommonArea
        isEditMode={true}
        initNote={{ title: props.title, content: props.content }}
        onUpdate={updateNote}
      />
      <IconButton className="cancel-button" onClick={props.onClose}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}

export default EditArea;
