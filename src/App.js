import React, { Component } from 'react';
import './App.css';
import RestaurantList from './Components/RestaurantList/RestaurantList'
import Map from './Components/Map/Map';
import Filter from './Components/Filter/Filter';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [   {
      "restaurantName":"Bronco",
      "address":"39 Rue des Petites Écuries, 75010 Paris",
      "lat":48.8737815,
      "long":2.3501649,
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
      "lat":48.8865035,
      "long":2.3442197,
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
   }]
    };
  }


  render(){
    return(
      <main clasName="flex-container">
        <div className="map-div">
          <Map />
        </div>
        <div className="restaurants-div">
          <RestaurantList data = {this.state.data} />
        </div>
      </main>
    );
  }
}

export default App;
