const { User } = require('../models');
const token = require('../token');

const login = async ({ email, password }) => {
  if (!email || !password) {
    return { message: 'Some required fields are missing' };
  }
  const user = await User.findOne({ 
    where: { email },
  });

  if (!user || user.password !== password) {
    return { message: 'Invalid fields' };      
  }

  const dataToken = token.newToken(email);
  return { token: dataToken };
};

module.exports = { login };
