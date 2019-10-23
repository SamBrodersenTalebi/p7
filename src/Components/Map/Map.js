import React, { Component } from 'react';
import './Map.css';


let lat = 0;
let long = 0;

export default class Map extends Component{
  constructor(props){
    super(props);
    this.state = {
      latitude:0,
      longitude:0,
      coordinates: this.props.coords
    }
    this.initMap = this.initMap.bind(this);
  }

  async componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) =>{
      lat = parseFloat(position.coords.latitude);
      long = parseFloat(position.coords.longitude);
    })
    this.renderMap();
  }

  initMap(){
    console.log(this.state.coordinates)
    //let browser access google by saying window.google
    let map = new window.google.maps.Map(document.getElementById('map'),{
      center: {lat:lat, lng: long},
      zoom: 8
    });

    //Users current position marker
    // IF YOU COULD USE MARKER FUNCTION IT WOULD WORK!!

    //Create a infowindow
    var infowindow = new window.google.maps.InfoWindow({map:map});

    //Streetview
    let panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('pano'),{
        position: {lat: lat, lng: long},
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  map.setStreetView(panorama);



    //add markers for each restaurant
    this.state.coordinates.map((venue) => {

      //content for infowindow
      var contentString = `<h2>Restaurant name: ${venue.name}</h2>`

      //Create a marker
      var marker = new window.google.maps.Marker({
        position:{lat: venue.lat, lng: venue.long},
        map: map,
        icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });

      //Markers listen for a click event which will open InfoWindow
      marker.addListener('click',function(){
        //change content
        infowindow.setContent(contentString)
        //open infowindow
        infowindow.open(map,marker);
      })
    })

    //add marker on click
    window.google.maps.event.addListener(map, 'click', function (e) {
      alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
      var marker = new window.google.maps.Marker({
        position:{lat:e.latLng.lat(), lng: e.latLng.lng()},
        map: map,
      });

      //add marker window
      marker.addListener('click',function(){
        //wait for user input
        infowindow.setContent('<input placeholder="Add restaurant name" type="text" class="info-popup" onkeypress ="myFunction()">')
        //open infoWindow
        infowindow.open(map,marker)
      })
    });

    let input = document.getElementsByClassName('info-popup')
    /*
    function myFunction(e){
      var key = e.which || e.keyCode;
      if(key === 13){
        let input = document.getElementsByClassName('info-popup');
        let textContent = input.textContent;
        input.innerHTML = `<h2> Restaurant name: ${textContent} </h2>`;
      }
    }

    input.addEventListener('keypress', function(e){
      var key = e.which || e.keyCode;
      if(key === 13){
        let textContent = input.textContent;
        input.innerHTML = `<h2> Restaurant name: ${textContent} </h2>`
      }
    })
    */
  }


  addMarker(coordinates, imageURL='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'){
    var marker = new window.google.maps.Marker({
      position:coordinates,
      icon:imageURL,
      map:this.state.map
    });
  }

  renderMap(){
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM&callback=initMap");
    window.initMap = this.initMap;
  }


  render(){
    /*
    let coordinates = this.props.coords;
    for(let i = 0; i < coordinates.length; i++){
      this.addMarker(coordinates[i]);
    }
    */

    return(
      <div className="map-container">
        <div id="map"> </div>
        <div id="pano"> </div>
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
