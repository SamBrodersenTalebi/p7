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
     /*
   //mode:no-cors --> fetch can not be blocked by CORS
    fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+horsens&key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM", {
      mode:"no-cors"
   }).then((response)=>{
      console.log(JSON.stringify(response.json()));
      //response.json();
   }).then((data)=>{
    this.setState({places: data})
   });
   */
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

// { mode: 'no-cors'}