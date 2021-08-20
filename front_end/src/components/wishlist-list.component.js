import React, { Component } from "react";
import WishlistDataService from "../services/wishlist.service";
import { Link } from "react-router-dom";

export default class WishlistList extends Component {
	constructor(props) {
		super(props);
		this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
		this.retrieveWishlist = this.retrieveWishlist.bind(this);
		this.refreshList = this.refreshList.bind(this);
		this.setActiveWishlist = this.setActiveWishlist.bind(this);
		this.removeAllWishlist = this.removeAllWishlist.bind(this);
		this.searchTitle = this.searchTitle.bind(this);

		this.state = {
			wishlists: [],
			currentWishlist: null,
			currentIndex: -1,
			searchTitle: '',
		};
	}

	componentDidMount() {
		this.retrieveWishlist();
	}

	onChangeSearchTitle(e) {
		const searchTitle = e.target.value;

		this.setState({
			searchTitle: searchTitle,
		});
	}

	retrieveWishlist() {
		WishlistDataService.getAll()
			.then((response) => {
				this.setState({
					wishlists: response.data,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	refreshList() {
		this.retrieveWishlist();
		this.setState({
			currentWishlist: null,
			currentIndex: -1,
		});
	}

	setActiveWishlist(wishlist, index) {
		this.setState({
			currentWishlist: wishlist,
			currentIndex: index,
		});
	}

	removeAllWishlist() {
		WishlistDataService.deleteAll()
			.then((response) => {
				console.log(response.data);
				this.refreshList();
			})
			.catch((e) => {
				console.log(e);
			});
	}

	searchTitle() {
		WishlistDataService.findByTitle(this.state.searchTitle)
			.then((response) => {
				this.setState({
					wishlists: response.data,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { searchTitle, wishlists, currentWishlist, currentIndex } =
			this.state;

		return (
			<div className='list row'>
				<div className='col-md-8'>
					<div className='input-group mb-3'>
						<input
							type='text'
							className='form-control'
							placeholder='Search by title'
							value={searchTitle}
							onChange={this.onChangeSearchTitle}
						/>
						<div className='input-group-append'>
							<button
								className='btn btn-outline-secondary'
								type='button'
								onClick={this.searchTitle}>
								Search
							</button>
						</div>
					</div>
				</div>
				<div className='col-md-6'>
					<h4>Wishlist List</h4>

					<ul className='list-group'>
						{wishlists &&
							wishlists.map((wishlist, index) => (
								<li
									className={
										'list-group-item ' +
										(index === currentIndex ? 'active' : '')
									}
									onClick={() => this.setActiveWishlist(wishlist, index)}
									key={index}>
									{wishlist.title}
								</li>
							))}
					</ul>

					<button
						className='m-3 btn btn-sm btn-danger'
						onClick={this.removeAllWishlist}>
						Remove All
					</button>
				</div>
				<div className='col-md-6'>
					{currentWishlist ? (
						<div>
							<h4>Wishlist</h4>
							<div>
								<label>
									<strong>Title:</strong>
								</label>{' '}
								{currentWishlist.title}
							</div>
							<div>
								<label>
									<strong>Description:</strong>
								</label>{' '}
								{currentWishlist.description}
							</div>
							<div>
								<label>
									<strong>Status:</strong>
								</label>{' '}
								{currentWishlist.published ? 'Published' : 'Pending'}
							</div>

							<Link
								to={'/wishlists/' + currentWishlist.id}
								className='badge badge-warning'>
								Edit
							</Link>
						</div>
					) : (
						<div>
							<br />
							<p>Please click on a Wishlist...</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}