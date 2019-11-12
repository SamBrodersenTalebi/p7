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
    this.setRestaurant()
  }

  maxHandler(event){
    this.setState({
      maxValue: event.target.value
    })
    this.setRestaurant()
  }

  //use life cycle function to trigger setRestaurant initially 
  UNSAFE_componentWillMount(){
    this.setRestaurant();
  }

  setData(){
    let restaurantNames = [];
    let coords = [];
    //map over data to save coordinates and names of restaurants
    this.props.data.map((restObject) =>{
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
        }else{
          return null;
        }
      });
      this.setState({
        restaurantNames: restaurantNames,
        coords: coords
      })
  }

  setRestaurant=()=>{
    let i = 0;
    let restaurants = this.props.data.map((object)=>{
      let ratings = object.ratings;
      let average = 0;
      for(let i = 0; i < ratings.length; i++){
        average += ratings[i].stars;
        }
        average /= ratings.length;
        if(average >= this.state.minValue && average <= this.state.maxValue){
          return(<Restaurant restaurant = {object} key={i++}/>)
        }else{
         return null;
        }
    })

    this.setState({
      restaurants: restaurants
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

// I need to update which restaurants are being displayed based on the filter but currently the state of restaurants are set once once the map is rendered