import React, { Component } from 'react';
import './RestaurantList.css';
import Restaurant from '../Restaurant/Restaurant';
import Filter from '../Filter/Filter';
import Map from '../Map/Map';

export default class RestaurantList extends Component{
  constructor(props){
    super(props);
    this.state={
      minValue: 1,
      maxValue:5,
      coords:"",
      restaurants:"",
      restaurantNames:""
    }
    this.minHandler = this.minHandler.bind(this);
    this.maxHandler = this.maxHandler.bind(this);
    this.setData = this.setData.bind(this);
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

  setData(){
    let restaurantNames = [];
    let coords = [];
    let i = 0;
    //pass each restaurant object to the Restaurant Class instance based on the filter
    let restaurants = this.props.data.map((restObject) =>{
      let ratings = restObject.ratings
      let average = 0;
      for(let i = 0; i < ratings.length; i++){
        average += ratings[i].stars;
        }
        average /= ratings.length;
        if(average >= this.state.minValue && average <= this.state.maxValue){
          let coordinates = {"lat": restObject.lat, "lng": restObject.long}
          let name = restObject.restaurantName
          coords.push(coordinates);
          restaurantNames.push(name);
          return(<Restaurant restaurant = {restObject} key={i++}/>);
        }else{
          return null;
        }
      });
      this.setState({
        restaurants: restaurants,
        restaurantNames: restaurantNames,
        coords: coords
      })
  }

  render(){
    return(
      <div className = "container">
        <div className="map-div">
          <Map coords = {this.state.coords} name={this.state.restaurantNames} googleIsLoaded={this.setData} />
        </div>
        <div className = "restaurantList">
          <Filter minValue = {this.state.minValue} maxValue={this.state.maxValue} minHandler = {this.minHandler} maxHandler = {this.maxHandler} />
          {this.state.restaurants}
        </div>
      </div>

    );
  }
}
