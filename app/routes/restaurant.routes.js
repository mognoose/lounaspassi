module.exports = app => {
    const restaurants = require("../controllers/restaurant.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", restaurants.create);
  
    // Retrieve all Tutorials
    router.get("/", restaurants.findAll);
  
    // Retrieve a single User with id
    router.get("/:id", restaurants.findOne);
    
    // Update a User with id
    router.put("/:id", restaurants.update);
    
    // Delete a User with id
    router.delete("/:id", restaurants.delete);
    
    // Delete all Tutorials
    // router.delete("/", restaurants.deleteAll);
    
    // Retrieve all published Tutorials
    // router.get("/published", restaurants.findAllPublished);
  
    app.use('/api/restaurants', router);
  };