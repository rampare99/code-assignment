import moviesSlice, { fetchMovies } from '../data/moviesSlice'
import { removeDuplicates } from '../utils';
import { moviesMock } from './movies.mocks'

describe('MovieSlice test', () => {
    
    it('should set loading true while action is pending', () => {
        const action = {type: fetchMovies.pending};
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        expect(action).toEqual({type: fetchMovies.pending})
     })

    it('should return payload when action is fulfilled', () => {
        const action = {
            type: fetchMovies.fulfilled, 
            payload: moviesMock
        };
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        expect(action.payload).toBeTruthy()
    })

    it('should set error when action is rejected', () => {
        const action = {type: fetchMovies.rejected};
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        expect(action).toEqual({type: fetchMovies.rejected})
     })

     it('should return an array without duplicates', () => {
        const array = [
            { id: 1, name: "movie1" },
            { id: 2, name: "movie2" },
            { id: 1, name: "movie1 again" },
            { id: 3, name: "movie3" },
        ];
        expect(removeDuplicates(array).find(movie => movie.name === "movie1 again")).toBeFalsy()
     })

})