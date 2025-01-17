import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Movie from "./Movie";
import "../styles/movies.scss";
import withInfiniteScroll from "../hoc/withInfiniteScroll";
import { ENDPOINT_DISCOVER } from "../constants";
import useSearchMovies from "../hooks/useSearchMovies";

const Movies = ({ movies, viewTrailer, closeCard, page, isLoading, fetch }) => {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const { searchMovies } = useSearchMovies();

	// initial fetch depending on search param
	useEffect(() => {
		if (page === 1 && !isLoading) {
			const searchQuery = searchParams.get("search");
			searchQuery
				? searchMovies(searchQuery)
				: dispatch(fetch({ apiUrl: ENDPOINT_DISCOVER, page }));
		}
	}, [dispatch, page, isLoading, searchParams]);

	return (
		<div data-testid="movies" className="cards-container">
			{movies.movies?.map((movie) => {
				return (
					<Movie
						movie={movie}
						key={movie.id}
						viewTrailer={viewTrailer}
						closeCard={closeCard}
					/>
				);
			})}
		</div>
	);
};

export default withInfiniteScroll(Movies);
