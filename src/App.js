import React, { Component } from 'react';
import './App.css';

import Map from './Components/Map/Map';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }


  render(){
    return(
      <main>
        <Map />
      </main>
    );
  }
}

export default App;
