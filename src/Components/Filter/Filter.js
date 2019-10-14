import React, { Component } from 'react';
import './Filter.css';

export default class Filter extends Component{
  render(){
    return(
      <div class="filter">
        <p> Filter the ratings: </p>
        <input type="range" min="1" max="5" step="1" value={this.props.value} onChange={this.props.handler} />
      </div>
    );
  }
}
