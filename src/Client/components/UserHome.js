// src/components/UserHome.js
import React from 'react';
import { useSelector } from 'react-redux';
import '../styles.css';

const UserHome = () => {
  const user = useSelector((state) => state.user); // Assuming you have a 'user' state in your Redux store

  if (!user) {
    // Handle case when user is not logged in
    return (
      <div className="login">
        <div className="login__form">
          <h1>Welcome!</h1>
          <p>Please log in to view user details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login">
      <div className="login__form">
        <h1>Welcome, {user.username}!</h1>
        <p>User ID: {user.id}</p>
      </div>
    </div>
  );
};

export default UserHome;
