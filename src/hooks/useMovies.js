import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../data/moviesSlice";
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "../constants";

const useMovies = () => {
	const { movies } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { fetchStatus, page, hasMore } = movies;
	const [searchParams, setSearchParams] = useSearchParams();
	const query = useMemo(() => searchParams.get("search"), [searchParams]);
	const isLoading = fetchStatus === "loading";

	const apiUrl = useMemo(() => {
		const baseUrl = query ? ENDPOINT_SEARCH : ENDPOINT_DISCOVER;
		const url = new URL(baseUrl);

		if (query) {
			const params = new URLSearchParams(url.search);
			params.set("query", query);
			url.search = params.toString();
		}

		return url.toString();
	}, [query]);

	const returnHome = () => {
		dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: 1 })).then(() =>
			window.scrollTo({ top: 0 })
		);
		setSearchParams();
	};

	return {
		movies,
		fetch: fetchMovies,
		page,
		hasMore,
		isLoading,
		apiUrl,
		returnHome,
	};
};

export default useMovies;
