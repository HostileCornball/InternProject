// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Updated import
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import axios for making HTTP requests
import Login from './components/Login';
import UserHome from './components/UserHome';
import UserForm from './components/UserForm';
import './styles.css';

const App = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  // Define a function to check authentication status before rendering protected routes
  const ProtectedRoute = ({ element, ...rest }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  // Define your API routes here
  const addNewUser = async (newUsername) => {
    try {
      await axios.post('/api/users', { username: newUsername });
      // Optionally, you can handle success or error responses here
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle errors appropriately, such as displaying an error message to the user
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <ProtectedRoute path="/user/home" element={<UserHome />} />
        <ProtectedRoute path="/user/form" element={<UserForm />} />
        {/* Ensure that the API routes are accessible only when the user is authenticated */}
        {isAuthenticated && (
          <Route
            path="/api"
            element={<Navigate to="/user/home" />} // Redirect to home if user tries to access API directly
          />
        )}
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
      </Routes>
    </Router>
  );
};

export default App;
