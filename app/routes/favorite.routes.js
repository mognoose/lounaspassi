module.exports = app => {
    const favorite = require("../controllers/favorite.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Favorite
    router.post("/", favorite.create);
  
    // Retrieve all Favorites
    router.get("/", favorite.findAll);
  
    // Retrieve a single Favorite with id
    // router.get("/:id", favorite.findOne);
    
    // Update a Favorite with id
    // router.put("/:id", favorite.update);
    
    // Delete a Favorite with id
    // router.delete("/:id", favorite.delete);
    
    // Delete a Favorite with id
    // router.delete("/:id", favorite.clear);
    
    // Delete all favorite
    // router.delete("/", favorite.deleteAll);
    
    // Retrieve all published Tutorials
    // router.get("/published", favorite.findAllPublished);
  
    app.use('/api/favorite', router);
  };