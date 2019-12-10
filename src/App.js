import React, { Component } from 'react';
import './App.css';
import RestaurantList from './Components/RestaurantList/RestaurantList'
//ZOOM IN ON MAP 
//Rerender map when I move it 
//GOOGLE MAP EVENT LISTENERS ZOOM and DRAG. 
/*let lat = 0;
let long = 0;
*/
class App extends Component{
  constructor(props){
    super(props);
    //make static data into JSON file. 
    this.state = {
   data:[],
   map: 0,
   places:0,
   sv: 0,
   infowindow:0,
   displayErrors: false,
   coordinates:0
  };

 }
  
  componentDidMount(){
      this.fetchLocalPlaces();
      this.renderMap();
  }

  fetchLocalPlaces=()=>{
    const endpoint = "data/restaurant.json";

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    fetch(endpoint,{
      method:'get',
      headers: headers
    })
    .then(res=> res.json())
    .then(data=>{
      this.setState({
        data:data
      });
    })
    .catch(err => console.error(err));
  }

  initMap=()=>{
   //let browser access google by saying window.google
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat:55.868460, lng: 9.862800},
      zoom: 13
    });

    this.setState({
      map:map
    });
    
    //Turn form into own component 
    //pass a function reference 
    //update state from child component 
    //call a function to give data to parent
    //add marker on click
    map.addListener('click',(e)=> {
      console.log("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
      let coordinates = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng() 
      };
      

      let marker = new window.google.maps.Marker({
        position:coordinates,
        map:map
      })

      this.setState({
        coordinates:coordinates
      })

    });

    //called after the map is done being dragged
    window.google.maps.event.addListener(map, 'dragend', function() { 
      alert('map dragged'); 
    } );

    //maps bounds
    //called when zooming in and out on map
    window.google.maps.event.addDomListener(map, 'zoom_changed', function(){
      alert('zoom change')
    })




    //when the map is done being created
    //let ref = this.refs.restaurantList;
    let info = this.initInfowindow;
    let service = this.placeService;
    window.google.maps.event.addListenerOnce(map, 'idle', function(){ 
      service();
      info();
    });
    
  }

  initInfowindow=()=>{
    if(window.google){
    //create streetview
     var sv = new window.google.maps.StreetViewService()
        
      // Create the shared infowindow with two DIV placeholders
      var content = document.createElement("DIV");
      var title = document.createElement("DIV");
      title.setAttribute('id', "infowindow-title");
      content.appendChild(title);
      var streetview = document.createElement("DIV");
      streetview.setAttribute('class', "streetview");
      streetview.style.width = "200px";
      streetview.style.height = "200px";
      content.appendChild(streetview);
      
      var infowindow = new window.google.maps.InfoWindow(
        { 
          size: new window.google.maps.Size(150,50),
          content: content
        });

        let panorama = new window.google.maps.StreetViewPanorama(streetview, {
          navigationControl: false,
          enableCloseButton: false,
          addressControl: false,
          linksControl: false,
          visible: true
         });
         //panorama.bindTo("position");
          
      this.setState({
       sv: sv,
       infowindow:infowindow,
       panorama: panorama,
       infowindowTitle:title
      });
    }
  }

  //NEED TO ACCESS THE LAT AND LONG FROM THE ADDED MARKER.
  handleSubmit=(event)=>{
    console.log("I am entering the form")
    const form = event.target;
    //will not rerender browser
    event.preventDefault();
    /*const formData = new FormData(event.target);
    console.log(formData)
    */

   //checks if the form is valid
   if (!event.target.checkValidity()) {
    // form is invalid! so we do nothing
    //make border of input red!
    this.setState({ displayErrors: true });
    return;
    }else{

      let data = this.state.data;
      //extract name 
      let name = form.elements.name; 
      //extract address
      let address= form.elements.address;

      //extract coordinates
      let coordinates = form.elements.coordinates.value;

      //save in an object
      let object = {
        "name":name,
        "address":address,
        "lat":coordinates.lat,
        "long":coordinates.lng,
        "reviews":[
       ],
      "rating":0
     };
     //push object to data and update the state
      data.push(object);
      this.setState({
       data:data,
       displayErrors: false
      })
    }
  
    
  }

  placeService=()=>{
    if(window.google){
      let map = this.state.map;
      //use placeService to retrieve restaurants.
      var service = new window.google.maps.places.PlacesService(map);

      
      var search = {
        type: ['restaurant'],
        location: {lat:55.8685003, lng: 9.8626621},
        radius: 870
      };


  
      service.nearbySearch(search, (results, status)=>{
        if(status === window.google.maps.places.PlacesServiceStatus.OK){ 
          let place = [];
          let update = this.updatePlace
          //map over results and call getdetails
          results.map((object)=>{
            //map over results call getDetails on each result place inside of nearbysearch
           service.getDetails({
              placeId:object.place_id
            }, function(detail,status){
              if(status === window.google.maps.places.PlacesServiceStatus.OK){
                place.push(detail);
                if(place.length === 5){
                  update(place);
                }
              }
            })
          });
        
        }else{
          console.log("Error");
          console.log(status);
        }
      })

    }
  }

  updatePlace=(place)=>{
    let ref = this.refs.restaurantList;
    this.setState({places:place},()=>{
      ref.callRef(place)
    }); 
  }

 
  
  



  renderMap(){
   loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM&callback=initMap&libraries=places");
   window.initMap = this.initMap;
 }


  render(){
    return(
      <main>
          <h1 className="title">Restaurant Review Site</h1>
          <RestaurantList data = {this.state.data} places={this.state.places} map = {this.state.map} infowindow={this.state.infowindow} sv={this.state.sv} infowindowTitle={this.state.infowindowTitle} panorama = {this.state.panorama} ref="restaurantList"/>
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