import React, { Component } from 'react';
import './App.css';
import RestaurantList from './Components/RestaurantList/RestaurantList'

/*let lat = 0;
let long = 0;
*/
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [   {
      "name":"Bronco",
      "vicinity":"39 Rue des Petites Écuries, 75010 Paris",
      "lat":55.862350,
      "long":9.852370,
      "reviews":[
        {
          "author_name":"Morten Olesen",
          "rating":4,
          "text":"Great! But not many veggie options."
        },
        {
          "author_name":"Pia Kjær",
          "rating":5,
          "text":"My favorite restaurant!"
        }
      ],
      "rating":4.5
   },
   {
      "name":"Babalou",
      "vicinity":"4 Rue Lamarck, 75018 Paris",
      "lat":55.855798,
      "long":9.846777,
      "reviews":[
        {
          "author_name":"Louise Poulsen",
          "rating":2,
          "text":"Tiny pizzeria next to Sacre Coeur!"
        },
        {
          "author_name":"Al Ulsted",
          "rating":3,
          "text":"Meh, it was fine."
        }
      ],
      "rating":2.5
   }],
   map: 0,
   places:0
 };
  }

  UNSAFE_componentWillMount(){
     //get current position.
     /*
     navigator.geolocation.getCurrentPosition((position) =>{
      lat = parseFloat(position.coords.latitude);
      long = parseFloat(position.coords.longitude);
    })
    */
  }
  
  componentDidMount(){
      this.renderMap();
  }

  initMap=()=>{
   //let browser access google by saying window.google
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat:55.868460, lng: 9.862800},
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
      let form = `<form style="width:200px;height:200px;">
      <label class="info-name">Name:</label><br><input type="text" placeholder="Enter Name"></input> 
      <br><label class="info-name">Address:</label><br><input type="text" placeholder="Address"></input>
      <input type="submit" value="Submit" onclick="this.formSubmit()"></form>`;
      //create a form inside of here 
      //press submit add restaurant to list and remove form
      //pop up in the middle of the screen
      //get state and add restaurant to state
      //Create a infowindow
      var infowindow = new window.google.maps.InfoWindow({map:map, content:form});

      let marker = new window.google.maps.Marker({
        position:coordinates,
        map:map
      })

      marker.addListener('click',function(){
        
        //open infowindow
        infowindow.open(map,marker);

      });

    });


    //when the map is done being created
    let ref = this.refs.restaurantList;
    
    let service = this.placeService;
    window.google.maps.event.addListenerOnce(map, 'idle', function(){ 
      service();
      ref.callRef();
    });
    
  }

  //NEED TO ACCESS THE LAT AND LONG FROM THE ADDED MARKER.
  formSubmit=()=>{
    let data = this.state.data;
    //extract name 
    let name; 
    //extract address
    let address;
    //save this data to object:
    let object = {
      "restaurantName":name,
      "address":address,
      "lat":55.862350,
      "long":9.852370,
      "reviews":[
      ],
      "rating":0
    };
    //push object to data and update the state
    data.push(object);
    this.setState({
      data:data
    })
  }

  placeService=()=>{
    if(window.google){
      let map = this.state.map;
      var service = new window.google.maps.places.PlacesService(map);

      
      var search = {
        type: ['restaurant'],
        location: {lat:55.8685003, lng: 9.8626621},
        radius: 870
      };


  
      service.nearbySearch(search, (results, status)=>{
        if(status === window.google.maps.places.PlacesServiceStatus.OK){ 
          console.log(results);
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
          console.log("Error");
          console.log(status);
        }
      })

    }
  }

 
  
  



  renderMap(){
   loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM&callback=initMap&libraries=places");
   window.initMap = this.initMap;
 }


  render(){
    return(
      <main>
          <h1 className="title">Restaurant Review Site</h1>
          <RestaurantList data = {this.state.data} places={this.state.places} map = {this.state.map} ref="restaurantList"/>
          <div id="map"></div>
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