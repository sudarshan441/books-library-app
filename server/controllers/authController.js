const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const token = createToken(user._id);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ email: user.email });
  } catch (err) {
    res.status(400).json({ error: 'Email already in use' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw Error();

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw Error();

    const token = createToken(user._id);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ email: user.email });
  } catch (err) {
    res.status(400).json({ error: 'Invalid credentials' });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out' });
};

exports.me = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('email');
    res.status(200).json(user);
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
