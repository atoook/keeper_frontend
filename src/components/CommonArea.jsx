import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Fab, Zoom } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

/**
 * form component used in CreateArea & EditArea
 */
function CommonArea(props) {
  const [note, setNote] = useState(props.initNote);
  const [isExpanded, setIsExpanded] = useState(false);
  const isShowModal = useSelector((state) => state.modal.value.isShowModal);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function expand() {
    setIsExpanded(true);
  }

  function handleClick(event) {
    event.preventDefault();
    props.onUpdate(note);
    setIsExpanded(false);
    setNote({
      title: "",
      content: "",
    });
  }

  return (
    <div>
      <form className="common-note">
        {(props.isEditMode || isExpanded) && (
          <input
            className="common-note-input-display"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onFocus={expand}
          value={note.content}
          placeholder="Take a note..."
          rows={props.isEditMode || isExpanded ? "3" : "1"}
        />
        {isShowModal && props.isEditMode && (
          <Zoom in={true}>
            <Fab onClick={handleClick}>
              <DoneIcon />
            </Fab>
          </Zoom>
        )}
        {!isShowModal && !props.isEditMode && (
          <Zoom in={isExpanded}>
            <Fab onClick={handleClick}>
              <AddIcon />
            </Fab>
          </Zoom>
        )}
      </form>
    </div>
  );
}

export default CommonArea;
