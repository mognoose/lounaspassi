const db = require("../models");
const Favorite = db.favorite;
const Restaurant = db.restaurant;
const Op = db.Sequelize.Op;

// Create and Save a new Favorite
exports.create = (req, res) => {
    // Validate request
    if (!req.body.user_id) {
      res.status(422).send({
        message: "Content can not be empty!"
      });
      return;
    }
    if (!req.body.restaurant_id) {
      res.status(422).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a favorite
    const favorite = {
      userId: req.body.user_id,
      restaurantId: req.body.restaurant_id,
    };
  
    // Save favorite in the database
    Favorite.create(favorite)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Favorite."
        });
      });
  };

// Retrieve all Favorites from the database.
exports.findAll = (req, res) => {
    const restaurantId = req.query.restaurantId;
    const userId = req.query.userId;
    let conditions = {where:{}, include: []}
    if(restaurantId) conditions.where.restaurantId = parseInt(restaurantId)
    if(userId) conditions.where.userId = parseInt(userId)
    // conditions.include = [{
    //   model: Favorite,
    //   // where: ["restaurant.id = favorite.id"]
    // }]

    Favorite.findAll(conditions).then(data => {
        // TODO: Fetch restaurant data too
        // data.restaurants = data.forEach(favorite => {
        //   console.log("DATA:", favorite.restaurantId);
        //   const restaurant = Restaurant.findByPk(favorite.restaurantId, res).then(data => {
        //     return data
        //   })
        //   return restaurant
        // });
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving favorites."
        });
      });
  };

// Find a single Favorite with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     Favorite.findByPk(id)
//       .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `Cannot find Favorite with id=${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Favorite with id=" + id
//         });
//       });
//   };

// Update a Favorite by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;
  
//     Favorite.update(req.body, {
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Favorite was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Favorite with id=${id}. Maybe Favorite was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Favorite with id=" + id
//         });
//       });
//   };

// Delete a Favorite with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Favorite.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Favorite was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Favorite with id=${id}. Maybe Favorite was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Favorite with id=" + id
        });
      });
  };


// // Delete all Favorites from the database.
exports.deleteAll = (req, res) => {
    Favorite.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Favorites were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Favorites."
        });
      });
  };

// // Find all published Favorites
// exports.findAllPublished = (req, res) => {
//     Favorite.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving Favorites."
//         });
//       });
//   };