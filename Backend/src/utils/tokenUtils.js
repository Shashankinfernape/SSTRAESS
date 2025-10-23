// backend/src/utils/tokenUtils.js
import jwt from 'jsonwebtoken';

// Generate an Access Token
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '15m', // Short-lived
  });
};

// Generate a Refresh Token
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
    expiresIn: '7d', // Long-lived
  });
};

// Send tokens as response
export const sendTokens = (res, user) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Set Refresh Token in secure httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', // Adjust to 'none' if backend and frontend are on different domains in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Send Access Token and user info in response body
  res.json({
    accessToken,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
};