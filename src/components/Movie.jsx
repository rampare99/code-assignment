import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'

const Movie = ({ movie, viewTrailer }) => {

    const state = useSelector((state) => state)
    const { starred, watchLater } = state
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions
    const { id, overview, release_date, poster_path, title } = movie;

    const formattedReleaseDate = release_date?.substring(0, 4);

    const dispatch = useDispatch()

    const myClickHandler = (e) => {
        if (!e) var e = window.event
        e.cancelBubble = true
        if (e.stopPropagation) e.stopPropagation()
        e.target.parentElement.parentElement.classList.remove('opened')
    }

    return (
        <div className="card" onClick={(e) => e.currentTarget.classList.add('opened')} >
            <div className="card-body text-center">
                <div className="overlay" />
                <div className="info_panel">
                    <div className="overview">{overview}</div>
                    <div className="year">{formattedReleaseDate}</div>
                    {!starred.starredMovies.find(movie => movie.id === id) ? (
                        <span className="btn-star" data-testid="starred-link" onClick={() => 
                            dispatch(starMovie({
                                id, 
                                overview, 
                                release_date: formattedReleaseDate,
                                poster_path: poster_path,
                                title: title
                            })
                        )}>
                            <i className="bi bi-star" />
                        </span>
                    ) : (
                        <span className="btn-star" data-testid="unstar-link" onClick={() => dispatch(unstarMovie(movie))}>
                            <i className="bi bi-star-fill" data-testid="star-fill" />
                        </span>
                    )}
                    {!watchLater.watchLaterMovies.find(movie => movie.id === id) ? (
                        <button type="button" data-testid="watch-later" className="btn btn-light btn-watch-later" onClick={() => dispatch(addToWatchLater({
                                id: id, 
                                overview: overview, 
                                release_date: formattedReleaseDate,
                                poster_path: poster_path,
                                title: title
                        }))}>Watch Later</button>
                    ) : (
                        <button type="button" data-testid="remove-watch-later" className="btn btn-light btn-watch-later blue" onClick={() => dispatch(removeFromWatchLater(movie))}><i className="bi bi-check"></i></button>
                    )}
                    <button type="button" className="btn btn-dark" onClick={() => viewTrailer(movie)}>View Trailer</button>                                                
                </div>
                <img className="center-block" src={(poster_path) ? `https://image.tmdb.org/t/p/w500/${poster_path}` : placeholder} alt="Movie poster" />
            </div>
            <h6 className="title mobile-card">{title}</h6>
            <h6 className="title">{title}</h6>
            <button type="button" className="close" onClick={(e) => myClickHandler(e)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default Movie