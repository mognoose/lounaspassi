module.exports = (sequelize, Sequelize) => {
    const Stamp = sequelize.define("stamp", {
      userId: {
        type: Sequelize.INTEGER
      },
      restaurantId: {
        type: Sequelize.INTEGER
      }
    });
  
    return Stamp;
  };