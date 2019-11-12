//COORDINATES PROPS NEEDS TO UPDATE ACCORDING TO THE FILTER BUT THE METHOD IS ONLY CALLED ONCE RIGHT NOW

import React, { Component } from 'react';
import './Map.css';
//geo location api

//let map = 0;
let lat = 0;
let long = 0;

export default class Map extends Component{
  constructor(props){
    super(props);
    this.state = {
      marker: ""
    }
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

    
    //place_id for Horsens
    var request = {
      placeId:"ChIJrWoV7FdgTEYRxvncjZpjPfU"
    };
    
    var service = new window.google.maps.places.PlacesService(this.map);
    var search = {
      //bounds: map.getBounds(),
      type: ['restaurant'],
      location: {lat:lat, lng: long},
      radius: 4300
    };

    service.nearbySearch(search, (results, status)=>{
      console.log(status);
      if(status == window.google.maps.places.PlacesServiceStatus.OK){
        console.log("Success")
        console.log(results)
      }else{
        console.log("Error")
      }
    })
/*
      //getDetails retrieves all details by a given placeID
      service.getDetails(request, function(place,status){
        console.log(status)
        if(status == window.google.maps.places.PlacesServiceStatus.OK){
          console.log(place);
        }
      })
      */
      

    //add marker on click
    var map = this.map
    this.map.addListener('click', function (e) {
      alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
      let coordinates = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng() 
      };

      var marker = new window.google.maps.Marker({
        position:coordinates,
        map:map
      })
      console.log(marker);

    });


    this.props.googleIsLoaded();

  }

  places=()=>{

  }



  addMarker = (coordinates,name)=>{
    if(window.google){
      var marker = new window.google.maps.Marker({
        position:coordinates,
      });
      marker.setMap(this.map);

      var contentString = `<div><h2>Restaurant name: ${name}</h2><div id=${name} style="width:200px;height:200px;"></div></div>`;

      
      //Create a infowindow
      var infowindow = new window.google.maps.InfoWindow({map:this.map, content:contentString});
    /* var pano = this.streetPano(name);
      this.map.setStreetView(pano);

      */

      //Markers listen for a click event which will open InfoWindow and StreetView
      marker.addListener('click',function(){
        
        
        let pano = new window.google.maps.StreetViewPanorama(document.getElementById(name),{
          position: coordinates,
           pov: {
            heading: 34,
            pitch: 10
           }
         });

         this.map.setStreetView(pano);
        
        //open infowindow
        infowindow.open(this.map,marker);

      });

      
      //event is fired when the close button is clicked 
      window.google.maps.event.addListener(infowindow, 'closeclick', function() {
        
      });

      //When clicking the marker map will center on the marker
      var map = this.map

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

    }
  }


  async streetPano(name, coordinates){
    let pano = new window.google.maps.StreetViewPanorama(document.getElementById(name),{
      position: coordinates,
      pov: {
        heading: 34,
        pitch: 10
      }
    });
    let panorama = await pano;
    return panorama;
  }



  renderMap(){
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM&callback=initMap&libraries=places");
    window.initMap = this.initMap;
  }


  render(){
    
    let names = this.props.name;
    let coordinates = this.props.coords;
    for(let i = 0; i < coordinates.length; i++){
      this.addMarker(coordinates[i],names[i]);
    }
    


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


//imageURL='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'