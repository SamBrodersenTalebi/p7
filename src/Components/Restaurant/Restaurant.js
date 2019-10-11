import React, { Component } from 'react';
import './Restaurant.css';

export default class Restaurant extends Component{
  render(){
    let review = this.props.restaurant.ratings.map((rating)=>{
      return(
        <Review stars = {rating.stars} comment = {rating.comment} />
      );
    })
    return(
      <div className="restaurant">
        <h3 className="name">
          {this.props.restaurant.restaurantName}
        </h3>
        <p className="address">
          {this.props.restaurant.address}
        </p>
        {review}
      </div>
    );
  }
}
