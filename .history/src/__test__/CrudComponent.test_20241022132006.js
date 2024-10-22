import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CrudComponent from './CrudComponent';

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

  test('creates a new item', async () => {
    render(<CrudComponent />);

    const input = screen.getByPlaceholderText('Add new item');
    const addButton = screen.getByText('Add Item');

    // Mock POST request
    axios.post.mockResolvedValue({
      data: { id: 3, name: 'New Item' }
    });

    // Add new item
    fireEvent.change(input, { target: { value: 'New Item' } });
    fireEvent.click(addButton);

    // Wait for new item to be added to the list
    await waitFor(() => {
      expect(screen.getByText('New Item')).toBeInTheDocument();
    });
  });

  test('updates an existing item', async () => {
    render(<CrudComponent />);

    // Wait for items to be rendered
    const editButton = await screen.findAllByText('Edit');
    
    // Click the edit button for the first item
    fireEvent.click(editButton[0]);

    const editInput = screen.getByDisplayValue('Item 1');
    fireEvent.change(editInput, { target: { value: 'Updated Item' } });

    const saveButton = screen.getByText('Save');
    
    // Mock PUT request
    axios.put.mockResolvedValue({
      data: { id: 1, name: 'Updated Item' }
    });

    fireEvent.click(saveButton);

    // Wait for the update to be reflected in the list
    await waitFor(() => {
      expect(screen.getByText('Updated Item')).toBeInTheDocument();
    });
  });

  test('deletes an item', async () => {
    render(<CrudComponent />);

    // Wait for items to be rendered
    const deleteButton = await screen.findAllByText('Delete');

    // Mock DELETE request
    axios.delete.mockResolvedValue({});

    // Delete the first item
    fireEvent.click(deleteButton[0]);

    // Wait for the item to be removed from the list
    await waitFor(() => {
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });
  });
});
