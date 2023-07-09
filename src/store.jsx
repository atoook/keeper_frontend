import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

/**
 * "Fab icon" and "Modal" used in the "CreateArea" and "Note" components will be created in separate DOM tree.
 * Therefore, it is necessary to manage the modal state globally so that the Fab icons in other components can be hidden when the modal is displayed.
 * In addition, combination of the note's id (defined as noteId) and the flag to display a modal (defined as isShowModal) needs to be used to open/close the modal for each note.
 */
const initialState = { value: { isShowModal: false, noteId: "" } };
const closeState = { value: { isShowModal: false, noteId: "" } };
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state, action) => {
      state.value = action.payload;
    },
    close: (state) => {
      state.value = closeState.value;
    },
  },
});

export const { open, close } = modalSlice.actions;
export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
  },
});
