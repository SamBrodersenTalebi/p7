import React, { Component } from 'react';
import './App.css';
import RestaurantList from './Components/RestaurantList/RestaurantList'



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
   places:0
 };
  }

  componentDidMount(){
    //place_id is an ID for a specific place in this case we use the place_id for Horsens
    fetch("https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJrWoV7FdgTEYRxvncjZpjPfU&radius=5000&types=restaurants&key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM")
    .then((response) => response.json())
    .then((data)=> this.setState({places: data}));
    console.log(this.state.places);
  }

  render(){
    return(
      <main>
          <RestaurantList data = {this.state.data} />
      </main>
    );
  }
}

export default App;
