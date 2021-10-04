module.exports = (sequelize, Sequelize) => {
    const Favorite = sequelize.define("favorite", {
      userId: {
        type: Sequelize.INTEGER
      },
      restaurantId: {
        type: Sequelize.INTEGER
      }
    });
  
    return Favorite;
  };