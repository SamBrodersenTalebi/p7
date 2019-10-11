import React, { Component } from 'react';
import './RestaurantList.css';
import '../Restaurant/Restaurant'

export default class RestaurantList extends Component{
  render(){
    //pass each restaurant object to the Restaurant Class instance
    let restaurants = this.props.data.map((restObject) =>{
      console.log(restaurants);
      //MAybe give each restaurant an id!
      //pass each object to restaurant for the array
      return(
        <Restaurant restaurant = {restObject} />
      )
    });
    return(
      <div className = "restaurantList">
        {restaurants}
      </div>
    );
  }
}
