import { createSearchParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "../constants";
import { fetchMovies } from "../data/moviesSlice";
import { useCallback } from "react";
import useDebouncedCallback from "./useDebouncedCallback";

const useSearchMovies = () => {
	const dispatch = useDispatch();
	const [, setSearchParams] = useSearchParams();

	const getSearchResults = useCallback(
		(query) => {
			if (query !== "") {
				const url = new URL(ENDPOINT_SEARCH);
				const params = new URLSearchParams(url.search);
				params.set("query", query);
				url.search = params.toString();

				dispatch(
					fetchMovies({
						apiUrl: url.toString(),
					})
				).then(() => window.scrollTo({ top: 0 }));

				setSearchParams(createSearchParams({ search: query }));
			} else {
				dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: 1 })).then(() =>
					window.scrollTo({ top: 0 })
				);
				setSearchParams();
			}
		},
		[dispatch, setSearchParams]
	);

	const searchMovies = useDebouncedCallback(getSearchResults, 500);

	return { searchMovies };
};

export default useSearchMovies;
