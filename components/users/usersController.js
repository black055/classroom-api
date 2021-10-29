const Users = require('./usersModel');

module.exports = {

  async getUser(username) {   
      const result = await Users.findOne({username: `${username}`});
      return result;
  },

  async addUser(user) {
      const checkExist = await Users.find({username: `${user.username}`});
          if (checkExist.length) {
              // Username đã tồn tại
              return false;
          } else {
          const newUser = new Users({
              username: user.username,
              pass: user.pass
          });
          newUser.save();
          return newUser;
      }
  }
}