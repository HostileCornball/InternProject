// src/redux/reducers.js
import { combineReducers } from 'redux';
import { LOGIN_USER, ADD_USER } from './actions';

const initialUserState = {
  id: null,
  username: '',
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      // Perform authentication logic here and update the user state
      return { id: 1, username: action.payload.username };
    default:
      return state;
  }
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      // Add a new user to the state
      const newUser = {
        id: state.length + 1,
        username: action.payload.newUsername,
      };
      return [...state, newUser];
    default:
      return state;
  }
};

const isAuthenticatedReducer = (state = false, action) => {
  switch (action.type) {
    case LOGIN_USER:
      // Perform authentication logic here and update the authentication state
      return true;
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  isAuthenticated: isAuthenticatedReducer,
});

export default rootReducer;
