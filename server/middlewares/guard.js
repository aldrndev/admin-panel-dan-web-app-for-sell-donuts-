const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw new Error('unauthorized');
    }

    const verify = verifyToken(access_token);

    const checkUser = await User.findByPk(verify.id);

    if (!checkUser) {
      throw new Error('unauthorized');
    }

    req.user = verify;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
