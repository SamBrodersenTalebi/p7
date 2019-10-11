import React, { Component } from 'react';
import './Review.css';

export default class Review extends Component{
  render(){
    return(
      <div className="review">
        <p className="comment"> <span className="cursive">Comment: </span> {this.props.comment} </p>
        <p className="stars">This restaurant has {this.props.stars} stars</p>
      </div>
    );
  }
}
