import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "modal",
	initialState: {
		isOpen: false,
		videoKey: "",
    movieTitle: "",
	},
	reducers: {
		openModal: (state, action) => {
			state.isOpen = true;
			state.videoKey = action.payload.videoKey;
      state.movieTitle = action.payload.title;
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.videoKey = "";
      state.movieTitle = "";
		},
	},
});

export default modalSlice;
