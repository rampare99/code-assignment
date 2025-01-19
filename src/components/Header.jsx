import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useSearchMovies from "../hooks/useSearchMovies";
import useMovies from "../hooks/useMovies";
import "../styles/header.scss";

const Header = () => {
	const navigate = useNavigate();
	const { searchMovies } = useSearchMovies();
	const { returnHome } = useMovies();
	const { starredMovies } = useSelector((state) => state.starred);

	const handleChange = (e) => {
		if (window.location.pathname !== "/") navigate("/");
		searchMovies(e.target.value);
	};

	return (
		<header>
			<Link to="/" data-testid="home" onClick={returnHome}>
				<i className="bi bi-film" />
			</Link>

			<nav>
				<NavLink
					to="/starred"
					data-testid="nav-starred"
					className="nav-starred"
				>
					{starredMovies.length > 0 ? (
						<>
							<i className="bi bi-star-fill bi-star-fill-white" />
							<sup className="star-number">{starredMovies.length}</sup>
						</>
					) : (
						<i className="bi bi-star" />
					)}
				</NavLink>
				<NavLink to="/watch-later" className="nav-fav">
					watch later
				</NavLink>
			</nav>

			<div className="input-group rounded">
				<input
					type="search"
					data-testid="search-movies"
					onChange={handleChange}
					className="form-control rounded"
					placeholder="Search movies..."
					aria-label="Search movies"
					aria-describedby="search-addon"
				/>
			</div>
		</header>
	);
};

export default Header;
