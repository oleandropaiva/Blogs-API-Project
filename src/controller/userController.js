const userService = require('../services/userService');

const addUser = async (req, res) => {
  try {
    const reqUser = req.body;
    const dataUser = await userService.addUser(reqUser);
    if (dataUser.message) {
      return res.status(409).json(dataUser);
    }
  
    return res.status(201).json(dataUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
    } 
};

const getAllUsers = async (_req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
    } 
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUser(id);
  if (user.message) {
    return res.status(404).json(user);
  }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
    } 
};

const deleteUser = async (req, res) => {
  const { authorization } = req.headers;
  try {
    const user = await userService.checkUser(authorization);
    if (user.message) {
      return res.status(404).json(user);
    }
    return res.status(user.code).json({ message: 'ok' });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
    } 
};

module.exports = { addUser, getAllUsers, getUser, deleteUser };