import React, { Component } from 'react';
import './RestaurantList.css';
import Restaurant from '../Restaurant/Restaurant'

export default class RestaurantList extends Component{
  render(){
    //pass each restaurant object to the Restaurant Class instance
    let restaurants = this.props.data.map((restObject) =>{
      //MAybe give each restaurant an unique id!
      //pass each object to restaurant from the data array
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
