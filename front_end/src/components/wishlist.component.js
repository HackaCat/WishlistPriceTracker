import React, { Component } from "react";
import WishlistDataService from "../services/wishlist.service";

export default class Wishlist extends Component {
	constructor(props) {
		super(props);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.getWishlist = this.getWishlist.bind(this);
		this.updatePublished = this.updatePublished.bind(this);
		this.updateWishlist = this.updateWishlist.bind(this);
		this.deleteWishlist = this.deleteWishlist.bind(this);

		this.state = {
			currentWishlist: {
				id: null,
				title: '',
				description: '',
				published: false,
			},
			message: '',
		};
	}

	componentDidMount() {
		this.getWishlist(this.props.match.params.id);
	}

	onChangeTitle(e) {
		const title = e.target.value;

		this.setState(function (prevState) {
			return {
				currentWishlist: {
					...prevState.currentWishlist,
					title: title,
				},
			};
		});
	}

	onChangeDescription(e) {
		const description = e.target.value;

		this.setState((prevState) => ({
			currentWishlist: {
				...prevState.currentWishlist,
				description: description,
			},
		}));
	}

	getWishlist(id) {
		WishlistDataService.get(id)
			.then((response) => {
				this.setState({
					currentWishlist: response.data,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	updatePublished(status) {
		var data = {
			id: this.state.currentWishlist.id,
			title: this.state.currentWishlist.title,
			description: this.state.currentWishlist.description,
			published: status,
		};

		WishlistDataService.update(this.state.currentWishlist.id, data)
			.then((response) => {
				this.setState((prevState) => ({
					currentWishlist: {
						...prevState.currentWishlist,
						published: status,
					},
				}));
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	updateWishlist() {
		WishlistDataService.update(
			this.state.currentWishlist.id,
			this.state.currentWishlist
		)
			.then((response) => {
				console.log(response.data);
				this.setState({
					message: 'The wishlist.service was updated successfully!',
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	deleteWishlist() {
		WishlistDataService.delete(this.state.currentWishlist.id)
			.then((response) => {
				console.log(response.data);
				this.props.history.push('/wishlist.services');
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { currentWishlist } = this.state;

		return (
			<div>
				{currentWishlist ? (
					<div className='edit-form'>
						<h4>Wishlist</h4>
						<form>
							<div className='form-group'>
								<label htmlFor='title'>Title</label>
								<input
									type='text'
									className='form-control'
									id='title'
									value={currentWishlist.title}
									onChange={this.onChangeTitle}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='description'>Description</label>
								<input
									type='text'
									className='form-control'
									id='description'
									value={currentWishlist.description}
									onChange={this.onChangeDescription}
								/>
							</div>

							<div className='form-group'>
								<label>
									<strong>Status:</strong>
								</label>
								{currentWishlist.published ? 'Published' : 'Pending'}
							</div>
						</form>

						{currentWishlist.published ? (
							<button
								className='badge badge-primary mr-2'
								onClick={() => this.updatePublished(false)}>
								UnPublish
							</button>
						) : (
							<button
								className='badge badge-primary mr-2'
								onClick={() => this.updatePublished(true)}>
								Publish
							</button>
						)}

						<button
							className='badge badge-danger mr-2'
							onClick={this.deleteWishlist}>
							Delete
						</button>

						<button
							type='submit'
							className='badge badge-success'
							onClick={this.updateWishlist}>
							Update
						</button>
						<p>{this.state.message}</p>
					</div>
				) : (
					<div>
						<br />
						<p>Please click on a Wishlist...</p>
					</div>
				)}
			</div>
		);
	}
}