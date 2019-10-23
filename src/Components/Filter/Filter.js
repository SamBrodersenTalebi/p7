import React, { Component } from 'react';
import './Filter.css';

export default class Filter extends Component{
  render(){
    return(
      <div className="filter">
        <p className="filter-p"> From: </p>
        <input type="number" min="1" max="5" steps="1" defaultValue={this.props.minValue} onChange={this.props.minHandler}/>
        <p className="filter-p"> To: </p>
        <input type="number" min="1" max="5" steps="1" defaultValue={this.props.maxValue} onChange={this.props.maxHandler}/>
      </div>
    );
  }
}
