/** @format */

import http from '../http-common';

class WishlistDataService {
	getAll() {
		return http.get('/wishlists');
	}

	get(id) {
		return http.get(`/wishlists/${id}`);
	}

	create(data) {
		return http.post('/wishlists', data);
	}

	update(id, data) {
		return http.put(`/wishlists/${id}`, data);
	}

	delete(id) {
		return http.delete(`/wishlists/${id}`);
	}

	deleteAll() {
		return http.delete(`/wishlists`);
	}

	findByTitle(title) {
		return http.get(`/wishlists?title=${title}`);
	}
}

export default new WishlistDataService();
