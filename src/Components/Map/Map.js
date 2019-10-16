import React, { Component } from 'react';
import './Map.css';


let lat = 0;
let long = 0;
let map = 0;

export default class Map extends Component{
  constructor(props){
    super(props);
    this.state = {
      latitude:0,
      longitude:0
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) =>{
      lat = parseFloat(position.coords.latitude);
      long = parseFloat(position.coords.longitude);
    })
    this.renderMap();
  }

  initMap(){
    //let browser access google by saying window.google
    map = new window.google.maps.Map(document.getElementById('map'),{
      center: {lat:lat, lng: long},
      zoom: 8
    });

    console.log(map);
  }

  addMarker(coordinates, imageURL='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'){
    console.log(map)
    var marker = new window.google.maps.Marker({
      position:coordinates,
      icon:imageURL
    });
    marker.setMap(map);
  }

  renderMap(){
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM&callback=initMap");
    window.initMap = this.initMap;
  }

  render(){
    let coordinates = this.props.coords;
    for(let i = 0; i < coordinates.length; i++){
      this.addMarker(coordinates[i]);
    }


    return(
      <div id="map"> </div>
    )
  }

}

/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
  async defer></script>
*/

function loadScript(url){
  //select the first script tag
  let index = window.document.getElementsByTagName("script")[0];
  //create script tag
  let script = window.document.createElement("script");
  // give script tag a source attribute
  script.src = url;
  // give script tag async and defer
  script.async = true;
  script.defer = true;
  //select first script tag and select parentNode and insert the script before it
  index.parentNode.insertBefore(script, index);
}
