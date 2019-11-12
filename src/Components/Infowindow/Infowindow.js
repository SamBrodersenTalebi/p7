import React, { Component } from 'react';

export default class InfoWindow extends Component{
    render(){
        var contentString = `<div><h2>Restaurant name: ${name}</h2><div id=${name} style="width:200px;height:200px;"></div></div>`;
      
        //Create a infowindow
        var infowindow = new window.google.maps.InfoWindow({map:this.map, content:contentString});
        var pano = this.streetPano(name);
        this.map.setStreetView(pano);

        return(

        )
    }
}