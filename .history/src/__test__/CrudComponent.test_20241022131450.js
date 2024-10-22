import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ContextApi, { UserContext } from './ContextApi';

// Mocking the fetch function globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          company: {
            name: 'Romaguera-Crona',
          },
        },
      ]),
  })
);

describe('ContextApi Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders without crashing and fetches user company data', async () => {
    render(<ContextApi />);

    // Check that the component renders the initial elements
    expect(screen.getByText('Hi')).toBeInTheDocument();

    // Wait for the fetched data to update the context value
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1); // Check that fetch was called
    });

    // Simulate child component consuming the context value
    const pageContent = screen.getByText(/Romaguera-Crona/i); // Assuming Page renders the company name
    expect(pageContent).toBeInTheDocument();
  });

  test('handles fetch failure gracefully', async () => {
    // Mock fetch to throw an error
    global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    render(<ContextApi />);

    // Expect fetch to be called but fail
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Since the fetch failed, no company name should be displayed
    const errorContent = screen.queryByText(/Romaguera-Crona/i);
    expect(errorContent).not.toBeInTheDocument();
  });
});
