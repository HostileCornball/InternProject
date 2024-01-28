// src/components/UserForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles.css';

const UserForm = () => {
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState('');

  const handleAddUser = async () => {
    try {
      // Make a POST request to the backend API endpoint to add a new user
      await axios.post('/api/users', { username: newUsername });
      
      // If the request is successful, dispatch the addUser action to update Redux state
      dispatch(addUser(newUsername));
      
      // Reset the input field after adding the user
      setNewUsername('');
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle errors appropriately, such as displaying an error message to the user
    }
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1>Add New User</h1>
        <input
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserForm;
