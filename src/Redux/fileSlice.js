import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [
    { id: 1, name: "main", type: "cpp", content: "// Your C++ code here" },
  ],
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setUserFiles: (state, action) => {
      state.files = action.payload;
    },
    addFile: (state, action) => {
      state.files.push(action.payload);
    },
    updateFile: (state, action) => {
      const index = state.files.findIndex(
        (file) => file.id === action.payload.id
      );
      if (index !== -1) {
        state.files[index] = action.payload;
      }
    },
    deleteFile: (state, action) => {
      state.files = state.filter((file) => file.id !== action.payload);
    },
  },
});

export const { setUserFiles, addFile, deleteFile, updateFile } =
  fileSlice.actions;
export default fileSlice.reducer;
