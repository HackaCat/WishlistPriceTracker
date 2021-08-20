/** @format */

module.exports = (app) => {
	const wishlists = require('../controllers/wishlist.controller.js');

	var router = require('express').Router();

	// Create a new wishlist
	router.post('/', wishlists.create);

	// Retrieve all wishlists
	router.get('/', wishlists.findAll);

	// Retrieve all published wishlists
	router.get('/published', wishlists.findAllPublished);

	// Retrieve a single wishlist with id
	router.get('/:id', wishlists.findOne);

	// Update a wishlist with id
	router.put('/:id', wishlists.update);

	// Delete a wishlist with id
	router.delete('/:id', wishlists.delete);

	// Delete all wishlists
	router.delete('/', wishlists.deleteAll);

	app.use('/api/wishlists', router);
};
