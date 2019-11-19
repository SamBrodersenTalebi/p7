//COORDINATES PROPS NEEDS TO UPDATE ACCORDING TO THE FILTER BUT THE METHOD IS ONLY CALLED ONCE RIGHT NOW

import React, { Component } from 'react';
import './Map.css';


export default class Map extends Component{







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

   

    }
  }

/*
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
  */



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



//imageURL='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'