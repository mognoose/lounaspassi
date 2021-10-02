const path = require("path");
const sqlite3 = require('sqlite3').verbose();

console.log("SETUP");

const db_name = path.join(__dirname, ".", "lp.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'lp.db'");
});
  
// Database creation if not created
const createStampsTable = `CREATE TABLE IF NOT EXISTS stamps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user INTEGER NOT NULL,
    restaurant INTEGER NOT NULL,
    date TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
  );`;
  
  db.run(createStampsTable, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'stamps' table");
  });
  
  const createRestaurantsTable = `CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    token VARCHAR(100) NOT NULL
    );`
  
  db.run(createRestaurantsTable, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'restaurants' table");
  });
  
  const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    token VARCHAR(100) NOT NULL
    );`
  
  db.run(createRestaurantsTable, err => {
    if (err) return console.error(err.message);
    console.log("Successful creation of the 'users' table");
  });
  
  return
    
  console.log('start seeding');
  restaurants = [
    {name: 'Kotipata Karvia', token: '0346298572099'},
    {name: 'Kotipata Kauhajoki', token: '0346298572098'}
  ]
  restaurants.forEach(r => {
    let seed = "INSERT INTO restaurants (name, token) VALUES('"+r.name+"', '"+r.token+"');"
    db.run(seed, err => {
      if (err) return console.error(err.message);
      console.log("Successfully added "+r.name+" to restaurants");
    });
  });
  