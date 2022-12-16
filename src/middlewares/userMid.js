const Joi = require('joi');

const joiDisplayName = Joi.string().min(8).required();
const joiEmail = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }); // ref: https://www.codegrepper.com/tpc/regex++for+email+joi+validation
const joiPassword = Joi.string().min(6).required();

const validationUser = (req, res, next) => {
  const validDisplayName = joiDisplayName.validate(req.body.displayName);
  if (validDisplayName.error) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  const validEmail = joiEmail.validate(req.body.email);
  if (validEmail.error) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
  const validPassword = joiPassword.validate(req.body.password);
  if (validPassword.error) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  } next();
};

module.exports = { validationUser };