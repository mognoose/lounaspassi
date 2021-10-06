module.exports = app => {
    const stamps = require("../controllers/stamp.controller.js")
    const auth = require("../middleware/auth")  
    var router = require("express").Router();
  
    // Create a new Stamp
    router.post("/", auth, stamps.create);
  
    // Retrieve all Tutorials
    router.get("/", auth, stamps.findAll);
  
    // Retrieve a single Stamp with id
    // router.get("/:id", stamps.findOne);
    
    // Update a Stamp with id
    // router.put("/:id", stamps.update);
    
    // Delete a Stamp with id
    router.delete("/clear", auth, stamps.clear);
    
    // Delete a Stamp with id
    router.delete("/:id", auth, stamps.delete);
    
    // Delete all Stamps
    // router.delete("/", stamps.deleteAll);
    
    // Retrieve all published Tutorials
    // router.get("/published", stamps.findAllPublished);
  
    app.use('/api/stamps', router);
  };