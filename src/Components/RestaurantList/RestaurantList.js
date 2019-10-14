import React, { Component } from 'react';
import './RestaurantList.css';
import Restaurant from '../Restaurant/Restaurant';
import Filter from '../Filter/Filter';

export default class RestaurantList extends Component{
  constructor(props){
    super(props);
    this.state={
      minValue: 1,
      maxValue:5,
      restaurant:this.props.data
    }
    this.minHandler = this.minHandler.bind(this);
    this.maxHandler = this.maxHandler.bind(this);
  }

  minHandler(event){
    this.setState({
      minValue: event.target.value
    })
    console.log(this.state.value)
  }

  maxHandler(event){
    this.setState({
      maxValue: event.target.value
    })
    console.log(this.state.value)
  }

  render(){
    let i = 0;
    //pass each restaurant object to the Restaurant Class instance based on the filter
    let restaurants = this.state.restaurant.map((restObject) =>{
      let ratings = restObject.ratings;
      for(let i = 0; i < ratings.length; i++){
        if(ratings[i].stars >= this.state.minValue && ratings[i].stars <= this.state.maxValue ){
          return(
            <Restaurant restaurant = {restObject} key={i++} />
          )
        }
        return null;
      }
    });

    return(
      <div className = "restaurantList">
        <Filter minValue = {this.state.minValue} maxValue={this.state.maxValue} minHandler = {this.minHandler} maxHandler = {this.maxHandler} />
        {restaurants}
      </div>
    );
  }
}
