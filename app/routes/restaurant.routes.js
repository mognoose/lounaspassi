module.exports = app => {
    const restaurants = require("../controllers/restaurant.controller.js");
    const auth = require("../middleware/auth")
    var router = require("express").Router();
  
    // Create a new Restaurant
    router.post("/", auth, restaurants.create);
  
    // Retrieve all restaurants
    router.get("/", restaurants.findAll);
  
    // Retrieve a single restaurant with id
    router.get("/:id", restaurants.findOne);
    
    // Update a restaurant with id
    router.put("/:id", auth, restaurants.update);
    
    // Delete a restaurant with id
    router.delete("/:id", auth, restaurants.delete);
    
    // Delete all restaurants
    // router.delete("/", restaurants.deleteAll);
    
    // Retrieve all published restaurants
    // router.get("/published", restaurants.findAllPublished);
  
    app.use('/api/restaurants', router);
  };