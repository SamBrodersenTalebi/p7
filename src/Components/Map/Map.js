import React, { Component } from 'react';
import './Map.css';
//geo location api

//let map = 0;
let lat = 0;
let long = 0;

export default class Map extends Component{
  constructor(props){
    super(props);
    this.initMap = this.initMap.bind(this);
  }


 componentDidMount(){
   //get current position.
    navigator.geolocation.getCurrentPosition((position) =>{
      lat = parseFloat(position.coords.latitude);
      long = parseFloat(position.coords.longitude);
    })
    this.renderMap();
  }

  initMap(){

    //let browser access google by saying window.google
    this.map = new window.google.maps.Map(document.getElementById('map'),{
      center: {lat:lat, lng: long},
      zoom: 8
    });


    //add marker on click
    window.google.maps.event.addListener(this.map, 'click', function (e) {
      alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
      var marker = new window.google.maps.Marker({
        position:{lat:e.latLng.lat(), lng: e.latLng.lng()},
        map: this.map,
      });

      var infowindow = new window.google.maps.InfoWindow({map:this.map});
      //add marker window
      marker.addListener('click',function(){
        //wait for user input
        infowindow.setContent('<input placeholder="Add restaurant name" type="text" class="info-popup" onkeypress ="myFunction()">')
        //open infoWindow
        infowindow.open(this.map,marker)
      })
    });

    this.props.googleIsLoaded();

  }
  

  addMarker = (coordinates,name)=>{
    if(window.google){
      var marker = new window.google.maps.Marker({
        position:coordinates,
        //icon:imageURL,
        //map:this.map
      });
      marker.setMap(this.map);
      

      // Create the shared infowindow with two DIV placeholders
      //one for streetview and the other for content string
      var content = document.createElement("DIV");
      var streetview = document.createElement("DIV");
      streetview.setAttribute("id", `${name}`);
      streetview.style.width = "200px";
      streetview.style.height = "200px";
      content.appendChild(streetview);
      //content for infowindow
      var contentString = `<h2>Restaurant name: ${name}</h2>`
      content.appendChild(contentString);

      
      //Streetview
      let panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById(`${name}`),{
        position: {lat: coordinates[0], lng: coordinates[1]},
        pov: {
          heading: 34,
          pitch: 10
        }
      });
      this.map.setStreetView(panorama);

      
      //Create a infowindow
      var infowindow = new window.google.maps.InfoWindow({map:this.map});
  
  
      //Markers listen for a click event which will open InfoWindow
      marker.addListener('click',function(){
        //change content
        infowindow.setContent(content)
        //open infowindow
        infowindow.open(this.map,marker);
      })
      
    }
  }

  renderMap(){
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM&callback=initMap");
    window.initMap = this.initMap;
  }


  render(){
    console.log(this.props.coords);
    
    let names = this.props.name;
    let coordinates = this.props.coords;
    for(let i = 0; i < coordinates.length; i++){
      this.addMarker(coordinates[i],names[i]);
    }
    


    return(
      <div className="map-container">
        <div id="map"> </div>
      </div>

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


//imageURL='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'