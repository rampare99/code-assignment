import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App'

it('movies starred and saved to watch later', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
    await waitFor(() => {
      expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
    })
    const starMovieLink = screen.getAllByTestId('starred-link')[0]
    await waitFor(() => {
        expect(starMovieLink).toBeInTheDocument()
    })
    await userEvent.click(starMovieLink)
    await waitFor(() => {
      expect(screen.getByTestId('star-fill')).toBeInTheDocument()
    })
    await waitFor(() => {
        expect(screen.getByTestId('unstar-link')).toBeInTheDocument()
    })

    const watchLaterLink = screen.getAllByTestId('watch-later')[0]
    await waitFor(() => {
        expect(watchLaterLink).toBeInTheDocument()
    })
    await userEvent.click(watchLaterLink)
    await waitFor(() => {
      expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument()
    })

    await userEvent.click(screen.getAllByTestId('remove-watch-later')[0])
})

it('triggers fetchMovies on scroll to bottom', async () => {
  const fetchMoviesSpy = jest.spyOn(require('../data/moviesSlice'), 'fetchMovies');

  renderWithProviders(<App />);

  fireEvent.scroll(window, { target: { scrollY: document.body.scrollHeight } });

  await waitFor(() => screen.getByTestId('scroll-loading-spinner'), { timeout: 500 });

  expect(fetchMoviesSpy).toHaveBeenCalled();

  fetchMoviesSpy.mockRestore();
});

it('returns home when clicking the header icon', async () => {
  const fetchMoviesSpy = jest.spyOn(require('../data/moviesSlice'), 'fetchMovies');

  renderWithProviders(<App />);

  await userEvent.click(screen.getByTestId('nav-starred')); // Asegúrate de tener un enlace con este testId
  expect(window.location.pathname).toBe('/starred');

  await userEvent.click(screen.getByTestId('home'));

  expect(fetchMoviesSpy).toHaveBeenCalled();
  expect(window.location.pathname).toBe('/');

  fetchMoviesSpy.mockRestore()
})
