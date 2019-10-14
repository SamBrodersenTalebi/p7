import React, { Component } from 'react';
import './RestaurantList.css';
import Restaurant from '../Restaurant/Restaurant';
import Filter from '../Filter/Filter';

export default class RestaurantList extends Component{
  constructor(props){
    super(props);
    this.state={
      value: 3,
      restaurant:this.props.data
    }
    this.handler = this.handler.bind(this);
  }

  handler(event){
    this.setState({
      value: event.target.value
    })
    console.log(this.state.value)
  }

  render(){
    let i = 0;
    //pass each restaurant object to the Restaurant Class instance
    let restaurants = this.state.restaurant.map((restObject) =>{
      let ratings = restObject.ratings;
      for(let i = 0; i < ratings.length; i++){
        if(ratings[i].stars >= this.state.value){
          return(
            <Restaurant restaurant = {restObject} key={i++} />
          )
        }
      }
    });
    
    return(
      <div className = "restaurantList">
        <Filter value = {this.state.value} handler = {this.handler} />
        {restaurants}
      </div>
    );
  }
}
