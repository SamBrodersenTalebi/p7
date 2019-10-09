import React, { Component } from 'react';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
  }

//Lifecycle method (runs after the APP output has been rendered to the DOM)
  componentDidMount(){
    this.renderMap();
  }

  renderMap(){
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM&callback=initMap")
    window.initMap = this.initMap;
  }

  initMap(){
    //to let the browser access google say window.google
    const map = new window.google.maps.Map(document.getElementById('map'), {
         center: {lat: 55.86066, lng: 9.85034},
         zoom: 8
       });
  }

  render(){
    return(
        <div id="map"> </div>
    );
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

export default App;
