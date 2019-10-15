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
      let ratings = restObject.ratings
      let average = 0;
      for(let i = 0; i < ratings.length; i++){
        average += ratings[i].stars;
        }
        average /= ratings.length;
        if(average >= this.state.minValue && average <= this.state.maxValue){
          return(<Restaurant restaurant = {restObject} key={i++}/>);
        }
      });
      //RENDER MAP COMPONENT IN RestaurantList CLASS!
      //WHEN YOU CLICK ON THE MARKER STREETVIEW SHOULD APPEAR AND INFOWINDOW WITH REVIEWS
      //CLICK ON RESTAURANT MARKER AND HAVE A FORM ADD A REVIEW
      //HAVE CLICK HANDLER ON MAP WHICH RETURNS THE LAT AND LNG OF THE CLICK AND HAVE A INFOWINDOW POP UP WHERE YOU CAN ADD A REVIEW
    return(
      <div className = "restaurantList">
        <Filter minValue = {this.state.minValue} maxValue={this.state.maxValue} minHandler = {this.minHandler} maxHandler = {this.maxHandler} />
        {restaurants}
      </div>
    );
  }
}
