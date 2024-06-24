import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: { points: [], lastPoint: null, localLocation: null },
  reducers: {
    addPointToStore: (state, action) => {
      state.points.push(action.payload);
      state.lastPoint = action.payload;
    },
    setLocalLocation: (state, action) => {
      state.localLocation = action.payload;
    },
  },
});

export const { addPointToStore, setLocalLocation } = mapSlice.actions;

export default mapSlice.reducer;
