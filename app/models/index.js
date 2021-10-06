const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);

db.restaurant = require("./restaurant.model.js")(sequelize, Sequelize);
db.restaurant.belongsTo(db.users)

db.stamp = require("./stamp.model.js")(sequelize, Sequelize);
db.stamp.hasOne(db.restaurant)
db.stamp.hasOne(db.users)

db.favorite = require("./favorite.model.js")(sequelize, Sequelize);
db.favorite.hasOne(db.restaurant)
db.favorite.hasOne(db.users)


module.exports = db;