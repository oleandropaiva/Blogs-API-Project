const { User } = require('../models');
const { newToken, checkToken } = require('../token');

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

const checkUser = async (authorization) => {
  const dataEmail = await checkToken(authorization);

  const { dataValues } = await User.findOne({ where: { email: dataEmail },
    attributes: { exclude: ['password'] } });
  if (dataValues.length === 0) {
    return { message: 'User not found' };
  }

  await User.destroy({
    where: { id: dataValues.id },
  });
  return { code: 204 };
};

module.exports = { addUser, getAllUsers, getUser, checkUser };