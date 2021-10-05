const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,

      }
    }, {
        sequelize, // We need to pass the connection instance
        hooks: {
          beforeBulkCreate: async (user) => {
           if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
            console.log("password encrypted. Hash:",user.password)
           }
          },
          beforeBulkUpdate: async (user) => {
           if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
            console.log("password encrypted. Hash:",user.password)
           }
          },
          beforeCreate: async (user) => {
           if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
            console.log("password encrypted. Hash:",user.password)
           }
          },
          beforeUpdate:async (user) => {
           if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
           }
          }
         },
         instanceMethods: {
          validPassword: (password) => {
           return bcrypt.compareSync(password, this.password);
          }
        }
    });
  
    return User;
  };