import React, { Component } from 'react';
import Review from '../Review/Review'
import './Restaurant.css';

export default class Restaurant extends Component{
  render(){
    let i = 0;
    let review = this.props.restaurant.ratings.map((rating)=>{
      return(
        <Review stars = {rating.stars} comment = {rating.comment} key={i++} />
      );
    })
    return(
      <div className="restaurant">
        <h3 className="name">
          {this.props.restaurant.restaurantName}
        </h3>
        <p className="address">
          <span className="fat">Restaurant Address: </span>{this.props.restaurant.address}
        </p>
        {review}
      </div>
    );
  }
}
