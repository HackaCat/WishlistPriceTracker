/** @format */

const db = require('../models');
const wishlist = db.wishlists;
const Op = db.Sequelize.Op;

// Create and Save a new wishlist
exports.create = (req, res) => {
			// Validate request
			if (!req.body.title) {
				res.status(400).send({
					message: 'Content can not be empty!',
				});
				return;
			}

			// Create a wishlist
			const wishlist = {
				title: req.body.title,
				description: req.body.description,
				published: req.body.published ? req.body.published : false,
			};

			// Save wishlist in the database
			wishlist.create(wishlist)
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					res.status(500).send({
						message:
							err.message || 'Some error occurred while creating the Wishlist.',
					});
				});

};

// Retrieve all wishlists from the database.
exports.findAll = (req, res) => {
      const title = req.query.title;
			var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

			wishlist.findAll({ where: condition })
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					res.status(500).send({
						message:
							err.message || 'Some error occurred while retrieving Wishlists.',
					});
				});
};

// Find a single wishlist with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

		wishlist.findByPk(id)
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: 'Error retrieving Wishlist with id=' + id,
				});
			});
};

// Update a wishlist by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

  wishlist.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "wishlist was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update wishlist with id=${id}. Maybe wishlist was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating wishlist with id=" + id
      });
    });
};

// Delete a wishlist with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

		wishlist.destroy({
			where: { id: id },
		})
			.then((num) => {
				if (num == 1) {
					res.send({
						message: 'wishlist was deleted successfully!',
					});
				} else {
					res.send({
						message: `Cannot delete wishlist with id=${id}. Maybe wishlist was not found!`,
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: 'Could not delete wishlist with id=' + id,
				});
			});
};

// Delete all wishlists from the database.
exports.deleteAll = (req, res) => {
     wishlist.destroy({
				where: {},
				truncate: false,
			})
				.then((nums) => {
					res.send({ message: `${nums} wishlists were deleted successfully!` });
				})
				.catch((err) => {
					res.status(500).send({
						message:
							err.message ||
							'Some error occurred while removing all wishlists.',
					});
				});
};

// Find all published wishlists
exports.findAllPublished = (req, res) => {
    wishlist.findAll({ where: { published: true } })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while retrieving wishlists.',
				});
			});
};
