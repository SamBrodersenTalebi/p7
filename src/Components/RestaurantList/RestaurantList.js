import React, { Component } from 'react';
import './RestaurantList.css';
import Restaurant from '../Restaurant/Restaurant';
import Filter from '../Filter/Filter';

let clickedMarker = null;

export default class RestaurantList extends Component{
  constructor(props){
    super(props);
    this.state={
      minValue: 1,
      maxValue:5,
      restaurants:"",
      coordinates:0,
      names:0,
      marker:0,
      placesRestaurant:"",
      googleMarkers: []
    }
    this.gmarkers = [];
    //have infowindow and pano in state
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
  callRef(place){
    this.setRestaurant(this.state.maxValue, this.state.minValue);
  }



  setRestaurant=(maxValue, minValue)=>{
    this.removeMarkers(this.gmarkers);
    let coords = [];
    let restaurantNames = [];
    let i = 0;
    let restaurants = this.props.data.map((object)=>{
      //get average rating
     let rating = object.rating
      //if average rating is within filter then display restaurant
      if(rating >= minValue && rating <= maxValue){
        let coordinates = {"lat": object.lat, "lng": object.long};
        let name = object.name;
        coords.push(coordinates);
        restaurantNames.push(name);
        return(<Restaurant restaurant = {object} key={i++}/>)
      } else{
        return null;
      }
    });
    
    let places = 0;
    if(this.props.places === 0){
    }else{
      places = this.props.places.map((object)=>{
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
        });
    }
 

     for(let i = 0; i < coords.length; i++){
       this.addMarker(coords[i],restaurantNames[i]);
     }


     this.setState({
      placesRestaurant:places,
      restaurants: restaurants,
      names: restaurantNames,
      coordinates: coords,
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

     //create marker
     var marker = new window.google.maps.Marker({
        position:coordinates,
        title:name
      });

      //set marker on map
      marker.setMap(map);

      this.gmarkers.push(marker)

      let pano = this.props.sv;
      let processSVData = this.processSVData;
      //listen for click on marker 
      //processSVData is a callback will be called once getPanoramaByLocation is finished
      window.google.maps.event.addListener(marker, "click", function(){
        clickedMarker = marker;
        pano.getPanoramaByLocation(marker.getPosition(), 50, processSVData);
      });

     
    }
 }


 processSVData=(data, status)=>{
  if (status === window.google.maps.StreetViewStatus.OK){
    let marker = clickedMarker;
    let pano = this.props.panorama;
    //if the marker is not null 
    if (!!pano  && !!pano.setPano) {
    //pass clicked marker into openInfoWindow method
    this.openInfoWindow(marker);
    //grabbing the pano with the matching id and setting it 
    pano.setPano(data.location.pano);
    pano.setPov({
      heading: 270,
      pitch: 0,
      zoom: 1
    });
    //make pano visible
    pano.setVisible(true);
    }else {
      console.error('Street View data not found for this location.');
    }
  }
 }
 

openInfoWindow(marker) {
  let infowindow = this.props.infowindow;
  console.log(infowindow)
  //Get the title and update the text content 
  var title = this.props.infowindowTitle
  title.textContent = marker.getTitle();
  //open infowindow once title is updated
  infowindow.open(this.props.map, marker);
}


  render(){
    return(
        <div className = "restaurantList">
          <Filter minValue = {this.state.minValue} maxValue={this.state.maxValue} minHandler = {this.minHandler} maxHandler = {this.maxHandler} />
          <div className="flex-container">
            {this.state.restaurants}
            {this.state.placesRestaurant}
          </div>
        </div>

    );
  }
}

