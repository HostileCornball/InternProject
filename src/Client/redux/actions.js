// src/redux/actions.js
export const LOGIN_USER = 'LOGIN_USER';
export const ADD_USER = 'ADD_USER';

export const loginUser = (username, password) => ({
  type: LOGIN_USER,
  payload: { username, password },
});

export const addUser = (newUsername) => ({
  type: ADD_USER,
  payload: { newUsername },
});
