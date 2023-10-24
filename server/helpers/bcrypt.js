const bcrypt = require('bcryptjs');

const hashPwd = (password) => bcrypt.hashSync(password);

const checkPwd = (password, hashingPwd) =>
  bcrypt.compareSync(password, hashingPwd);

module.exports = {
  hashPwd,
  checkPwd,
};
