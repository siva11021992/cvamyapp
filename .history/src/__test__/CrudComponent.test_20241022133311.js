const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const axios = require('axios');
const CrudComponent = require('./CrudComponent');

// Mock axios to prevent real API calls during tests
jest.mock('axios');

describe('CrudComponent', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]
    });
  });

  test('renders the CRUD component and fetches items', async () => {
    render(<CrudComponent />);

    // Expect the heading to be present
    expect(screen.getByText('CRUD Example')).toBeInTheDocument();

    // Wait for items to be fetched and displayed
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  // (Other test cases...)
});
