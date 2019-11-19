import React, { Component } from 'react';
import './App.css';
import RestaurantList from './Components/RestaurantList/RestaurantList'

let lat = 0;
let long = 0;

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [   {
      "restaurantName":"Bronco",
      "address":"39 Rue des Petites Écuries, 75010 Paris",
      "lat":55.862350,
      "long":9.852370,
      "ratings":[
         {
            "stars":4,
            "comment":"Great! But not many veggie options."
         },
         {
            "stars":5,
            "comment":"My favorite restaurant!"
         }
      ]
   },
   {
      "restaurantName":"Babalou",
      "address":"4 Rue Lamarck, 75018 Paris",
      "lat":55.855798,
      "long":9.846777,
      "ratings":[
         {
            "stars":2,
            "comment":"Tiny pizzeria next to Sacre Coeur!"
         },
         {
            "stars":3,
            "comment":"Meh, it was fine."
         }
      ]
   }],
   places:0,
   map: 0
 };
  }

  UNSAFE_componentWillMount(){
     //get current position.
     navigator.geolocation.getCurrentPosition((position) =>{
      lat = parseFloat(position.coords.latitude);
      long = parseFloat(position.coords.longitude);
    })
  }
  
  componentDidMount(){
      this.renderMap();
  }

  initMap=()=>{
   //let browser access google by saying window.google
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat:lat, lng: long},
      zoom: 8
    });

    this.setState({map:map});
    
    //add marker on click
    map.addListener('click', function (e) {
      alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
      let coordinates = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng() 
      };

      new window.google.maps.Marker({
        position:coordinates,
        map:map
      })

    });

    this.placeService();

    //when the map is done being created
    let ref = this.refs.restaurantList;
    window.google.maps.event.addListenerOnce(map, 'idle', function(){ ref.callRef() });
    
  }

  placeService=()=>{
    if(window.google){

      let map = this.state.map;
      var service = new window.google.maps.places.PlacesService(map);
      var search = {
        type: ['restaurant'],
        location: {lat:lat, lng: long},
        radius: 870
      };
  
      service.nearbySearch(search, (results, status)=>{
        console.log(status);
        if(status === window.google.maps.places.PlacesServiceStatus.OK){ 
          console.log(results)
          let place = [];
          results.map((object)=>{
            //map over results call getDetails on each result place inside of nearbysearch
           service.getDetails({
              placeId:object.place_id
            }, function(detail,status){
              if(status === window.google.maps.places.PlacesServiceStatus.OK){
                place.push(detail);
              }
            })
          })
          this.setState({places:place});  
        }else{
          console.log("Error")
        }
      })
    }
  }
  



  renderMap(){
   loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM&callback=initMap&libraries=places");
   window.initMap = this.initMap;
 }


  render(){
    console.log(this.state.places)
    return(
      <main className="container">
          <div id="map"></div>
          <RestaurantList data = {this.state.data} places={this.state.places} map = {this.state.map} ref="restaurantList"/>
      </main>
    );
  }
}

export default App;

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