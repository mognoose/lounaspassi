const db = require("../models");
const Stamp = db.stamp;
const Op = db.Sequelize.Op;

// Create and Save a new Stamp
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userId) {
      res.status(422).send({
        message: "Content can not be empty!"
      });
      return;
    }
    if (!req.body.restaurantId) {
      res.status(422).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a stamp
    const stamp = {
      userId: req.body.userId,
      restaurantId: req.body.restaurantId,
    };
  
    // Save stamp in the database
    Stamp.create(stamp)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Stamp."
        });
      });
  };

// Retrieve all Stamps from the database.
exports.findAll = (req, res) => {
    const restaurantId = req.query.restaurantId;
    const userId = req.query.userId;
    let conditions = {where:{}}
    if(restaurantId) conditions.where.restaurantId = parseInt(restaurantId)
    if(userId) conditions.where.userId = parseInt(userId)

    Stamp.findAll(conditions).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving stamps."
        });
      });
  };

// Find a single Stamp with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     Stamp.findByPk(id)
//       .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `Cannot find Stamp with id=${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Stamp with id=" + id
//         });
//       });
//   };

// Update a Stamp by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;
  
//     Stamp.update(req.body, {
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Stamp was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Stamp with id=${id}. Maybe Stamp was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Stamp with id=" + id
//         });
//       });
//   };

// Delete a Stamp with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Stamp.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Stamp was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Stamp with id=${id}. Maybe Stamp was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Stamp with id=" + id
        });
      });
  };

// Delete a Stamp with the specified id in the request
exports.clear = (req, res) => {
  const userId = req.body.userId;
  const restaurantId = req.body.restaurantId;
  let conditions = {where:{}}
  if(restaurantId) conditions.where.restaurantId = parseInt(restaurantId)
  if(userId) conditions.where.userId = parseInt(userId)

  Stamp.destroy(conditions)
    .then(num => {
      if (num > 0) {
        res.send({
          message: "Stamps were deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Stamps. Maybe Stamps were not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Stamps"
      });
    });
};

// // Delete all Stamps from the database.
// exports.deleteAll = (req, res) => {
//     Stamp.destroy({
//       where: {},
//       truncate: false
//     })
//       .then(nums => {
//         res.send({ message: `${nums} Stamps were deleted successfully!` });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all Stamps."
//         });
//       });
//   };

// // Find all published Stamps
// exports.findAllPublished = (req, res) => {
//     Stamp.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving Stamps."
//         });
//       });
//   };