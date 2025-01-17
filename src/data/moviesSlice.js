import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeDuplicates } from "../utils";

export const fetchMovies = createAsyncThunk(
	"fetch-movies",
	async ({ apiUrl, page }) => {
		const url = new URL(apiUrl);
		const params = new URLSearchParams(url.search);
		if (page) {
			params.set("page", page);
		}
		url.search = params.toString();
		const response = await fetch(url);
		return response.json();
	}
);

const moviesSlice = createSlice({
	name: "movies",
	initialState: {
		movies: [],
		fetchStatus: "",
		page: 1,
		hasMore: true,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.movies =
					action.payload.page === 1
						? [...action.payload.results]
						: // We remove the duplicates based on their ID to avoid repeated results (see issue in my documentation)
						  removeDuplicates(
								[...state.movies, ...action.payload.results],
								"id"
						  );
				state.fetchStatus = "success";
				state.hasMore = action.payload.total_pages > action.payload.page;
				state.page = action.payload.page + 1;
			})
			.addCase(fetchMovies.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(fetchMovies.rejected, (state) => {
				state.fetchStatus = "error";
			});
	},
});

export default moviesSlice;
