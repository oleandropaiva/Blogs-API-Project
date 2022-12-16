const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const dataLogin = await loginService.login({ email, password });
  if (dataLogin.message) {
    return res.status(400).json(dataLogin);
  }
  return res.status(200).json(dataLogin);
};

module.exports = { login };
