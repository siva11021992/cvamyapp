import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckBox from './CheckBox';

function CrudComponent() {
  const [items, setItems] = useState([]); // State to hold list of items
  const [newItem, setNewItem] = useState(''); // State to handle new item input
  const [editItem, setEditItem] = useState(false); // State to hold the item being edited

  // Fetch items (Read)
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      console.log("Fetched Res:", response);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items', error);
    }
  };

  // Create item
  const createItem = async () => {
    console.log("newItem",newItem)
    if (newItem) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', { name: newItem });
        console.log("Create Response:", response);
        setItems([...items, response.data]);
        setNewItem(''); // Clear input after adding item
      } catch (error) {
        console.error('Error creating item', error);
      }
    }
  };

  // Update item
  const updateItem = async (id, updatedName) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/1`, { name: updatedName });
      console.log("Update Response:", response);

      // Manually updating the state after the update request
      setItems(items.map(item => (item.id === id ? { ...item, name: updatedName } : item)));
      setEditItem(null); // Stop editing after update
    } catch (error) {
      console.error('Error updating item', error);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  return (
    <div>
      <h1>CRUD Example</h1>

      {/* Create new item */}
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={createItem}>Add Item</button>

      {/* List of items */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>

            {editItem && editItem.id === item.id ? (
              <>
                <input
                  type="text"
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                />
                <button onClick={() => updateItem(item.id, editItem.name)}>Save</button>
                <button onClick={() => setEditItem(null)}>Cancel</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => setEditItem({ id: item.id, name: item.name })}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <CheckBox  title="hello" age={5} {...items}/>
    </div>
  );
}

export default CrudComponent;
