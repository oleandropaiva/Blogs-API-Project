const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET } = process.env; 

const checkToken = (token) => {
  try {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
  } catch (err) {
  console.log(err);
  return { err };
  }
  };

const newToken = (payload) => {
const token = jwt.sign(payload, JWT_SECRET);
return token;
};

module.exports = { checkToken, newToken }; 