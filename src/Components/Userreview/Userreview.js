import React, { Component } from 'react';


export default class Userreview extends Component{
  render(){
    return(
      <form>
        <input name = "Comment"
               value = "hi"
               type = "text"
               placeholder = "Please add review"
        />
        <select
          name = "Rating"
        >
          <option value="1">1 star</option>
          <option value="2">2 star</option>
          <option value="3">3 star</option>
          <option value="4">4 star</option>
          <option value="5">5 star</option>
        </select>
        <button type="submit"> Submit </button>
      </form>
    )
  }
}
