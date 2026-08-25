import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

function createToken(admin) {
  return jwt.sign(
    {
      id: admin._id,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function authResponse(admin) {
  return {
    token: createToken(admin),
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
}

export async function signup(req, res) {
  const signupKey = process.env.ADMIN_SIGNUP_KEY;
  if (!signupKey || req.get('x-admin-signup-key') !== signupKey) {
    return res.status(403).json({ message: 'Admin signup is disabled or unauthorized.' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingAdmin = await AdminUser.findOne({ email: normalizedEmail });
  if (existingAdmin) {
    return res.status(409).json({ message: 'An admin account already exists for this email.' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await AdminUser.create({ name: name.trim(), email: normalizedEmail, passwordHash });

  res.status(201).json(authResponse(admin));
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const admin = await AdminUser.findOne({ email: email.trim().toLowerCase() });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  res.json(authResponse(admin));
}
