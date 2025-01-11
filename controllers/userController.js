const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Student } = require('../models/student');
const { Teacher } = require('../models/teacher');


exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const HashPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ username, password: HashPassword });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePass = async (req, res) => {
  const { username, password } = req.body;
  try {
    const HashPassword = await bcrypt.hash(password, 8);
    console.log(HashPassword)
    const olduser = await User.findOne({ username });
    console.log(olduser)
    const user = await User.findOneAndUpdate({ username }, { password: HashPassword });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user with given email
    const AllUsers = await User.find();
    console.log(AllUsers)
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password using bcrypt
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    // const isPassword = await bcrypt.compare(user.password, user.password);
    if (!isPassword) {
      return res.status(400).json({ message: 'Invalid  password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "mysecretkey");

    const responseObj = { user, token };

    return res.status(200).json(responseObj);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.loginClient = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username,password);
  let user = await Student.findOne({ regestrationNo: username });
  console.log("student", user)
  let userType = 'Student';

  if (!user) {
    user = await Teacher.findOne({ regestrationNo: username });
    console.log("Teacher", user);

    userType = 'Teacher';
  }

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isPassword) {
    return res.status(400).json({ message: 'Invalid  password' });
  }

  const token = jwt.sign({ id: user._id, userType }, 'mysecretkey', {
    expiresIn: '1h'
  });

  return res.status(200).json({ user: user, token });

};


exports.getUserDataById = async (req, res) => {
  const userId = req.params.id;
  console.log("userId", userId)
  let user;

  // Search for user in Student model
  user = await Student.findById(userId);
  if (user) {
    console.log(user)
    return res.status(200).json({ user });
  }

  // Search for user in Teacher model
  user = await Teacher.findById(userId);
  if (user) {
    return res.status(200).json({ user });
  }

  // If user not found in either model, return error response
  return res.status(404).json({ message: 'User not found' });
};
