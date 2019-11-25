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
      restaurants:"",
      coordinates:0,
      names:0,
      marker:0
    }
    this.minHandler = this.minHandler.bind(this);
    this.maxHandler = this.maxHandler.bind(this);
  }

  //setRestaurant as a callback in the setState.
  minHandler(event){
    this.setState({
      minValue: event.target.value
    }, this.setRestaurant(this.state.maxValue, event.target.value))
  }

  maxHandler(event){
    this.setState({
      maxValue: event.target.value
    }, this.setRestaurant(event.target.value, this.state.minValue))
  }

  //call this method within the parent class (App.js)  
  callRef(){
    this.setRestaurant(this.state.maxValue, this.state.minValue)
  }


  setRestaurant=(maxValue, minValue)=>{
    this.removeMarkers(this.state.marker);
    let coords = [];
    let restaurantNames = [];
    let gmarkers = [];
    let i = 0;
    let restaurants = this.props.data.map((object)=>{
      //get average rating
     let rating = object.rating
      //if average rating is within filter then display restaurant
      if(rating >= minValue && rating <= maxValue ){
        let coordinates = {"lat": object.lat, "lng": object.long};
        let name = object.restaurantName;
        coords.push(coordinates);
        restaurantNames.push(name);
        return(<Restaurant restaurant = {object} key={i++}/>)
      } else{
        return null;
      }
    })

    /*let places = this.props.places.map((object)=>{
      //get average rating 
      let rating = object.rating;
      if(rating >= minValue && rating <= maxValue ){
        let coordinates = {"lat": object.geometry.location.lat(), "lng": object.geometry.location.lng()};
        let name = object.name;
        coords.push(coordinates);
        restaurantNames.push(name);
        return(<Restaurant restaurant = {object} key={i++}/>)
      }else{
        return null;
      }
    })
    */


    
     for(let i = 0; i < coords.length; i++){
       let marker = this.addMarker(coords[i],restaurantNames[i]);
       gmarkers.push(marker)
     }

     this.setState({
      //places:places,
      restaurants: restaurants,
      names: restaurantNames,
      coordinates: coords,
      marker: gmarkers
    })
  }

  removeMarkers=(array)=>{
    for(let i=0; i<array.length; i++){
      array[i].setMap(null);
    }
  }

  addMarker=(coordinates, name)=>{
    if(window.google){
     let map = this.props.map

     var marker = new window.google.maps.Marker({
        position:coordinates,
      });

      //set marker on map
      marker.setMap(map);

      //content for infowindow
      var contentString = `<div><h2>Restaurant name: ${name}</h2><div id=${name} style="width:200px;height:200px;"></div></div>`;

      //Create a infowindow
     var infowindow = new window.google.maps.InfoWindow({map:map, content:contentString});
      
      //Panorama

      let pano = new window.google.maps.StreetViewPanorama(document.getElementById(name),{
        position: coordinates
       });
       
      //set panorama on map
    map.setStreetView(pano);

     marker.addListener('click',function(){
        
        //open infowindow
        infowindow.open(pano,marker);

      });

      /*
      map.addListener('center_changed', function() {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function() {
          map.panTo(marker.getPosition());
        }, 3000);
      });
    
        marker.addListener('click', function() {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
      });
      */

      return marker;
    }
 }


  render(){
     
    return(
        <div className = "restaurantList">
          <Filter minValue = {this.state.minValue} maxValue={this.state.maxValue} minHandler = {this.minHandler} maxHandler = {this.maxHandler} />
          {this.state.restaurants}
        </div>

    );
  }
}

