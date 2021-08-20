import React, { Component } from "react";
import WishlistDataService from "../services/wishlist.service";

export default class AddWishlist extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.saveWishlist = this.saveWishlist.bind(this);
    this.newWishlist = this.newWishlist.bind(this);

    this.state = {
      id: null,
      name: "",
      url: "", 
      price: 0.00,
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    });
  }

  saveWishlist() {
    var data = {
      name: this.state.name,
      url: this.state.url
    };

    WishlistDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          url: response.data.url,
          price: response.data.price,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newWishlist() {
    this.setState({
      id: null,
      name: "",
      url: "",
      price: 0.00,

      submitted: false
    });
  }
    render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newWishlist}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="url">Url</label>
              <input
                type="text"
                className="form-control"
                id="url"
                required
                value={this.state.url}
                onChange={this.onChangeUrl}
                name="url"
              />
            </div>

            <button onClick={this.saveWishlist} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}