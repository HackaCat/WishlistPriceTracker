/** @format */

import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddWishlist from './components/add-wishlist.component';
import Wishlist from './components/wishlist.component';
import WishlistsList from './components/wishlist-list.component';

class App extends Component {
	render() {
		return (
			<div>
				<nav className='navbar navbar-expand navbar-dark bg-dark'>
					<a href='/wishlists' className='navbar-brand'>
						HOME
					</a>
					<div className='navbar-nav mr-auto'>
						<li className='nav-item'>
							<Link to={'/wishlists'} className='nav-link'>
								Wishlists
							</Link>
						</li>
						<li className='nav-item'>
							<Link to={'/add'} className='nav-link'>
								Add
							</Link>
						</li>
					</div>
				</nav>

				<div className='container mt-3'>
					<Switch>
						<Route exact path={['/', '/wishlists']} component={WishlistsList} />
						<Route exact path='/add' component={AddWishlist} />
						<Route path='/wishlists/:id' component={Wishlist} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
