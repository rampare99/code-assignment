import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from "./test/utils"
import App from './App'

it('renders watch later link', () => {
  renderWithProviders(<App />)
  const linkElement = screen.getByText(/watch later/i)
  expect(linkElement).toBeInTheDocument()
})

it('search for movies', async () => {
  renderWithProviders(<App />)
  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
  await waitFor(() => {
    expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
  })
  const viewTrailerBtn = screen.getAllByText('View Trailer')[0]
  await userEvent.click(viewTrailerBtn)
  await waitFor(() => {
    expect(screen.getByTestId('youtube-player')).toBeInTheDocument()
  })
})

it('closes the modal when the close button is clicked', async () => {
  const preloadedState = {
    modal: {
      isOpen: true,
      videoKey: 'testVideoKey',
      movieTitle: 'Test Movie',
    },
  };

  renderWithProviders(<App />, { preloadedState });

  expect(screen.getByTestId('trailer-modal')).toBeInTheDocument();

  const closeButton = screen.getByTestId('close-trailer-modal-button');
  await userEvent.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByTestId('trailer-modal')).not.toBeInTheDocument();
  });
});

it('closes the modal when clicking outside the modal content', async () => {
  const preloadedState = {
    modal: {
      isOpen: true,
      videoKey: 'testVideoKey',
      movieTitle: 'Test Movie',
    },
  };

  renderWithProviders(<App />, { preloadedState });

  expect(screen.getByTestId('trailer-modal')).toBeInTheDocument();

  const modalBackdrop = screen.getByTestId('trailer-modal');
  await userEvent.click(modalBackdrop);
  await waitFor(() => {
    expect(screen.queryByTestId('trailer-modal')).not.toBeInTheDocument();
  });
});

it('displays message when videoKey is not provided', async () => {
  const preloadedState = {
    modal: {
      isOpen: true,
      videoKey: null,
      movieTitle: 'Test Movie',
    },
  };

  renderWithProviders(<App />, { preloadedState });

  expect(screen.getByTestId('trailer-modal')).toBeInTheDocument();

  expect(screen.getByText('No trailer available.')).toBeInTheDocument();
});

it('renders watch later component', async() => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByText(/watch later/i))
  expect(screen.getByText(/You have no movies saved to watch later/i)).toBeInTheDocument()
})


it('renders starred component', async() => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByTestId('nav-starred'))
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument()
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument()
  })  
})
