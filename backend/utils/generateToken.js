import jwt from 'jsonwebtoken';

// expiresIn: 토큰 만료일
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
export default generateToken;
