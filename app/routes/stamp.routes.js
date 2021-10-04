module.exports = app => {
    const stamps = require("../controllers/stamp.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Stamp
    router.post("/", stamps.create);
  
    // Retrieve all Tutorials
    router.get("/", stamps.findAll);
  
    // Retrieve a single Stamp with id
    // router.get("/:id", stamps.findOne);
    
    // Update a Stamp with id
    // router.put("/:id", stamps.update);
    
    // Delete a Stamp with id
    router.delete("/clear", stamps.clear);
    
    // Delete a Stamp with id
    router.delete("/:id", stamps.delete);
    
    // Delete all Stamps
    // router.delete("/", stamps.deleteAll);
    
    // Retrieve all published Tutorials
    // router.get("/published", stamps.findAllPublished);
  
    app.use('/api/stamps', router);
  };