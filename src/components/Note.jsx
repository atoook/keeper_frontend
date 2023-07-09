import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Zoom, IconButton } from "@mui/material";
import Modal from "react-modal";
import EditArea from "./EditArea";
import { open, close } from "../store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

function Note(props) {
  const dispatch = useDispatch();
  const [isShowModal, noteId] = useSelector(
    (state) => [state.modal.value.isShowModal, state.modal.value.noteId],
    shallowEqual
  );

  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "20%",
    },
  };

  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  function handleEditClick() {
    dispatch(open({ isShowModal: true, noteId: props.id }));
  }

  function closeModal() {
    dispatch(close());
  }

  return (
    <Zoom in={true}>
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <IconButton
          className="note-update-button"
          aria-label="add"
          onClick={handleEditClick}
          disabled={isShowModal}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          className="note-delete-button"
          onClick={handleDeleteClick}
          disabled={isShowModal}
        >
          <DeleteIcon />
        </IconButton>
        <>
          <Modal
            isOpen={isShowModal && shallowEqual(noteId, props.id)}
            style={customStyles}
            ariaHideApp={false}
          >
            <EditArea
              onClose={() => {
                closeModal();
              }}
              {...props}
            ></EditArea>
          </Modal>
        </>
      </div>
    </Zoom>
  );
}

export default Note;
