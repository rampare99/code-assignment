import { Routes, Route } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import TrailerModal from "./components/TrailerModal";
import useViewTrailer from "./hooks/useViewTrailer";
import useMovies from "./hooks/useMovies";
import "./app.scss";

const App = () => {
	const { viewTrailer } = useViewTrailer();
	const moviesConfig = useMovies();

	return (
		<div className="App">
			<Header />
			<div className="container">
				<TrailerModal />
				<Routes>
					<Route
						path="/"
						element={<Movies viewTrailer={viewTrailer} {...moviesConfig} />}
					/>
					<Route
						path="/starred"
						element={<Starred viewTrailer={viewTrailer} />}
					/>
					<Route
						path="/watch-later"
						element={<WatchLater viewTrailer={viewTrailer} />}
					/>
					<Route
						path="*"
						element={<h1 className="not-found">Page Not Found</h1>}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
