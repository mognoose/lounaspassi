const db = require("../models");
const User = db.users;
const Restaurant = db.restaurant;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    
    // Validate request
    if (!req.body.name) {
      res.status(422).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a User
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
  
    // Save User in the database
    const user = User.create(userData)

    // Create token
    const token = jwt.sign(
      { user_id: user._id, name: userData.name },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    res.send(user);
  } catch (error) {
    console.log(error);
  }

};


// Find a single User with an id
exports.login = async (req, res) => {
  try {
    
    const name = req.query.name;
    const password = req.query.password;

    const user = await User.findOne({ where: { name: name } })
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, name: user._name },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      
      const restaurant = await Restaurant.findOne({ where: { userId: user.id } })
      if(restaurant) user.dataValues.restaurantId = restaurant.id
      
      res.send(user);
    }

  } catch (error) {
    console.error(error);    
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };
// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//     User.destroy({
//       where: {},
//       truncate: false
//     })
//       .then(nums => {
//         res.send({ message: `${nums} Users were deleted successfully!` });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all users."
//         });
//       });
//   };

// // Find all published Users
// exports.findAllPublished = (req, res) => {
//     User.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving users."
//         });
//       });
//   };