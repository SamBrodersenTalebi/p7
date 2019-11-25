import React, { Component } from 'react';
import './Review.css';

export default class Review extends Component{
  render(){
    let stars = [];
    for (let i=0; i <this.props.stars; i++){
      let star = "★";
      stars.push(star);
    }
    let rating = stars.map(star=>{
    return (<span>{star}</span>);
    })
    
    return(
      <div className="review">
        <p><span className="cursive">Author: </span> {this.props.author}</p>
        <p className="comment"> <span className="cursive">Comment: </span> {this.props.comment} </p>
        <p className="stars"> <span className="cursive">Stars: </span> {rating} </p>
      </div>
    );
  }
}
