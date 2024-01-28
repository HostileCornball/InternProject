// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define user schema and model
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  isActive: { type: Boolean, default: true } // Assign active status, default is true
});
const User = mongoose.model('User', userSchema);

// Define JWT secret key
const JWT_SECRET = 'your_secret_key';// I haven't share mine :D

// Register route
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'User is not active' });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle user addition

// The /api/users route is added to handle the addition of new users. When a POST request is made to this endpoint, 
//the server creates a new user in the database with the provided username and sets the isActive field to true by default.
// This route is placed alongside  other routes such as user registration (/register) and user login (/login).

app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    // Create a new user
    const newUser = new User({
      username,
      password: '', // You might want to handle password for new users differently
      isActive: true // Defaulting new users to active
    });
    await newUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
