const { User } = require('../models');
const { newToken } = require('../token');

const addUser = async (reqUser) => {
  const dataUser = await User.findAll({ where: { email: reqUser.email } });
  if (dataUser.length > 0) {
    return { message: 'User already registered' };
  }
  await User.create(reqUser);
  const token = newToken({ email: reqUser.email });
  
  return { token };
};

const getAllUsers = async () => {
  const getUsers = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return getUsers;
};

const getUser = async (id) => {
  const dataUser = await User.findOne({ where: { id },
    attributes: { exclude: ['password'] } });
  if (!dataUser) {
    return { message: 'User does not exist' };
  }
  return dataUser;
};

module.exports = { addUser, getAllUsers, getUser };