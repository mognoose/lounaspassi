// const { Restaurant } = require(".");
const models = require("../models");
// const Restaurant = db.restaurant;

module.exports = (sequelize, Sequelize) => {
    const Favorite = sequelize.define("favorite", {
      userId: {
        type: Sequelize.INTEGER
      },
      restaurantId: {
        type: Sequelize.INTEGER
      }
    });
    Favorite.associate = function(models) {
      Favorite.hasOne(models.Restaurant)

    }
  
    return Favorite;
  };