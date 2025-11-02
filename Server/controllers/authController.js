import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// register
export const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // יצירת JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
