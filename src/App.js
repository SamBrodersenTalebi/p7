import React, { Component } from 'react';
import './App.css';
import RestaurantList from './Components/RestaurantList/RestaurantList'
import Form from './Components/Form/Form'


class App extends Component{
  constructor(props){
    super(props);
    //make static data into JSON file. 
    this.state = {
   localData:[],
   map: 0,
   placesData:0,
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

    //Content-Type header tells the client what the content type of the returned content actually is
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
        localData:data
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

    //when the map is done being created then call these functions
    let ref = this.refs.mapClick;
    let info = this.initInfowindow;
    let service = this.placeService;
    let mapEventHandler = this.mapEventHandler;

    window.google.maps.event.addListenerOnce(map, 'idle', function(){ 
      service();
      info();
      ref.mapClickHandler();
      mapEventHandler(map);
    });
    
  }

  mapEventHandler =(map)=>{
    //called after the map is done being dragged
    window.google.maps.event.addListener(map, 'dragend', ()=>{ 
      this.showVisibleMarkers('map is dragged', map);
    } );

    
    //called when zooming in and out on map
    window.google.maps.event.addDomListener(map, 'zoom_changed', ()=>{
      this.showVisibleMarkers('map is zoomed',map)
    })
  }

  //display the visible markers
  showVisibleMarkers=(string, map)=>{
    console.log(`${string}`);
    this.placeService();
    this.fetchLocalPlaces();
    let local = this.returnVisibleMarkers(map,this.state.localData, false);
    let googlePlaces = this.returnVisibleMarkers(map,this.state.placesData, true);
    this.setState({
      localData:local,
      placesData: googlePlaces
    },()=>{
      this.refs.restaurantList.callRef();
    });  
  }

  //Filter places that are within the currently displayed map and save the outcome to state.
  returnVisibleMarkers=(map,mapData, fromGooglePlaces)=>{
    //getBound() shows the latitude and longitude for the corners of the visible area of the google map
    const bounds = map.getBounds();
    const placeData = [];
    let latlng = 0;
    
    //map the places to see if they are in bounds
    mapData.map((place)=>{
      if(fromGooglePlaces){
        latlng = {
          lat:place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
      }else{
        latlng = {
          lat:place.lat,
          lng:place.long
        }
      }
     
      if(bounds.contains(latlng)===true){
        //this means the marker is within the maps bounds
        placeData.push(place);
      }else{
        return;
      }
    });

    return placeData;
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
          //map over results and call getdetails
          results.map((object)=>{
            //map over results call getDetails on each result place inside of nearbysearch
           service.getDetails({
              placeId:object.place_id
            }, (detail,status)=>{
              if(status === window.google.maps.places.PlacesServiceStatus.OK){
                place.push(detail);
                if(this.state.placesData === 0){
                  if(place.length === 5){
                    this.updatePlace(place);
                  }
                }else{
                  this.setState({placesData:place}); 
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
    this.setState({placesData:place},()=>{
      ref.callRef();
    }); 
  }


  renderMap(){
   loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM&callback=initMap&libraries=places");
   window.initMap = this.initMap;
 }

 callbackFunctionForm = (childData)=>{
   let data = this.state.localData;
   data.push(childData);
   console.log(data);
   this.setState({
     localData:data
   });
   this.refs.restaurantList.callRef()
 }


  render(){
    return(
      <main>
          <h1 className="title">Restaurant Review Site</h1>
          <div id="flex-container">
            <div id="map"></div>
            <RestaurantList data = {this.state.localData} places={this.state.placesData} map = {this.state.map} infowindow={this.state.infowindow} sv={this.state.sv} infowindowTitle={this.state.infowindowTitle} panorama = {this.state.panorama} ref="restaurantList"/>
          </div>

          <Form map ={this.state.map} parentCallback={this.callbackFunctionForm} ref="mapClick"/>
         
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