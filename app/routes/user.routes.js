module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require("../middleware/auth")
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all Users
    router.get("/", auth, users.findAll);

    router.get("/login", users.login);
  
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
    
    // Update a User with id
    router.put("/:id", auth, users.update);
    
    // Delete a User with id
    router.delete("/:id", auth, users.delete);
    
    // Delete all Users
    // router.delete("/", users.deleteAll);
    
    // Retrieve all published Users
    // router.get("/published", users.findAllPublished);
  
    app.use('/api/users', router);
  };