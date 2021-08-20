/** @format */

module.exports = (sequelize, Sequelize) => {
	const Wishlist = sequelize.define('wishlist', {
		url: {
			type: Sequelize.STRING,
		},
		name: {
			type: Sequelize.STRING,
		},
		price: {
			type: Sequelize.FLOAT,
		}
	});

	return Wishlist;
};
