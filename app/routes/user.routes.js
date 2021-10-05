module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all Tutorials
    router.get("/", users.findAll);

    router.get("/login", users.login);
  
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
    
    // Update a User with id
    router.put("/:id", users.update);
    
    // Delete a User with id
    router.delete("/:id", users.delete);
    
    // Delete all Tutorials
    // router.delete("/", users.deleteAll);
    
    // Retrieve all published Tutorials
    // router.get("/published", users.findAllPublished);
  
    app.use('/api/users', router);
  };