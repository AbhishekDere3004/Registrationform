
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { validationResult } = require('express-validator');
const helmet = require('helmet');
const { check, body } = require('express-validator');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhishekdere3004:abhishekdere3004@mern-todo.efqxtbq.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  mobile: String,
  govtIdType: String,
  govtId: String,
  address: String,
  state: String,
  city: String,
  country: String,
  pincode: String,
});

const User = mongoose.model('User', userSchema);

// Input validation middleware
const validateInputs = [
  check('name').notEmpty().withMessage('Name is required'),
  check('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  // Add more validation rules for other fields
];

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Endpoint to handle form submissions
app.post('/api/submit', validateInputs, async (req, res, next) => {
  try {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userData = req.body;

    // Create a new user document
    const newUser = new User(userData);

    // Save the user to the database
    await newUser.save();
    res.status(200).send('User data saved successfully');
  } catch (error) {
    next(error);
  }
});

// Endpoint to get all submitted users
app.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
