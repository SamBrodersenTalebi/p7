import React, { Component } from 'react';
import Review from '../Review/Review'
import './Restaurant.css';

export default class Restaurant extends Component{
  constructor(props){
    super(props);
    this.state = {
      form:false,
      review: this.props.restaurant.ratings,
      text:'',
      rating:1,
      showReview:false
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  toggleForm(){
    const { form } = this.state;
    this.setState({form:!form})
    /*this.setState(prevState => ({
      showComponent: !prevState.showComponent
    }));
    */
  }

  handleSubmit(event){
    event.preventDefault();
    //push userReview to review array
    const userReview = {"stars":this.state.rating, "comment": this.state.text};
    this.state.review.push(userReview);
    this.setState({
      text:'',
      rating:1
    })
  }

  handleChange(event){
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    })
  }

  handleClick(){
    const { showReview } = this.state;
    this.setState({showReview:!showReview})
  }

  render(){
    console.log(this.state.form)
    let i = 0;
    let review = this.state.review.map((rating)=>{
      return(
        <Review stars = {rating.stars} comment = {rating.comment} key={i++} />
      );
    })
    return(
      <div className="restaurant">
        <h3 className="name">
          {this.props.restaurant.restaurantName}
        </h3>
        <p className="address">
          <span className="fat">Restaurant Address: </span>{this.props.restaurant.address}
        </p>
        <div className="review">
          {review}
        </div>
        <button onClick = {this.toggleForm}> Add review </button>
        {
          this.state.form?
          <form onSubmit = {this.handleSubmit}>
            <input name="text" value={this.state.text} type="text" placeholder="please write review here" onChange = {this.handleChange}/>
            <select name="rating" value={this.state.rating} onChange={this.handleChange}>
              <option value="1"> 1 star </option>
              <option value="2"> 2 stars </option>
              <option value="3"> 3 stars </option>
              <option value="4"> 4 stars </option>
              <option value="5"> 5 star </option>
            </select>
            <button type="submit"> Submit </button>
          </form>
          :null
        }
      </div>
    );
  }
}
