const Users = require('./usersModel');
const bcrypt = require("bcrypt");

module.exports = {

  async getUser(username) {   
      const result = await Users.findOne({username: `${username}`});
      return result;
  },

  async getUserByID(_id) {   
    const result = await Users.findOne({_id: `${_id}`});
    return result;
  },

  async addUser(user) {
      const checkExist = await Users.find({username: `${user.username}`});
          if (checkExist.length) {
              // Username đã tồn tại
              return false;
          } else {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            const newUser = new Users({
                username: user.username,
                password: hashedPassword,
                firstname: user.firstname,
                lastname: user.lastname
            });
            newUser.save();
            return newUser;
      }
  }
}