import React, { Component } from 'react';
import './Map.css';

export default class Map extends Component{

  componentDidMount(){
    this.renderMap();
  }

  initMap(){
    let latitude = 0;
    let longitude = 0;

    //ASYNC CALL
    //get current coordinates of user
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition)
    } else{
      console.log('Can not get geolocation!')
    }

    function showPosition(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    }
    console.log(latitude);
    console.log(longitude);

    //let browser access google by saying window.google
    const map = new window.google.maps.Map(document.getElementById('map'),{
      center: {lat: latitude, lng: longitude},
      zoom: 8
    });
  }

  renderMap(){
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM&callback=initMap");
    window.initMap = this.initMap;
  }

  render(){
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
