import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { API_KEY, ENDPOINT } from "../constants";
import modalSlice from "../data/modalSlice";

const useViewTrailer = () => {
	const dispatch = useDispatch();
	const { openModal } = modalSlice.actions;

	const viewTrailer = useCallback(async (movie) => {
		const videoKey = await getMovie(movie.id);
		dispatch(openModal({ videoKey, title: movie.title }));
	}, []);

	const getMovie = useCallback(async (id) => {
		const url = new URL(`${ENDPOINT}/movie/${id}`);
		const params = new URLSearchParams();

		params.set("api_key", API_KEY);
		params.set("append_to_response", "videos");

		url.search = params.toString();
		const videoData = await fetch(url).then((response) => response.json());

		if (videoData.videos && videoData.videos.results.length) {
			const trailer = videoData.videos.results.find(
				(vid) => vid.type === "Trailer"
			);
			return trailer ? trailer.key : videoData.videos.results[0].key;
		}
	}, []);

	return { viewTrailer };
};

export default useViewTrailer;
