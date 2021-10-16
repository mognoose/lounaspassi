const models = require("../models");

module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define("restaurant", {
      name: {
        type: Sequelize.STRING
      },
    });
    Restaurant.associate = function(models) {
      Restaurant.belongsToMany(models.Favorite)

    }
    return Restaurant;
  };