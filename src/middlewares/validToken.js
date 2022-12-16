const { checkToken } = require('../token');

const midValidToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenValid = checkToken(authorization);
    if (tokenValid.err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'access denied' });
  }
};

module.exports = { midValidToken };