import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

export async function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminUser.findById(decoded.id).select('-passwordHash');

    if (!admin) {
      return res.status(401).json({ message: 'Admin account no longer exists.' });
    }

    req.admin = admin;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
