import jwt from 'jsonwebtoken';

export const generateToken = (userId,res) => {

  const token = jwt.sign({userId}, process.env.JWT_TOKEN, {
    expiresIn: '5d', // Token expiration time
  });

   res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
});


  return token;
}