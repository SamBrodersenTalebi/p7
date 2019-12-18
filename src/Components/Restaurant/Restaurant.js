import React, { Component } from 'react';
import Review from '../Review/Review'
import './Restaurant.css';

export default class Restaurant extends Component{
  constructor(props){
    super(props);
    this.state = {
      form:false,
      review: this.props.restaurant.reviews,
      text:'',
      rating:1,
      showReview:false,
      toggleRestaurant:false
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  toggleForm(){
    const { form } = this.state;
    this.setState({form:!form})
  }

  handleSubmit(event){
    event.preventDefault();
    //push userReview to review array
    const userReview = {"rating":this.state.rating, "comment": this.state.text, "author_name":"Anonymous"};
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
    this.setState({showReview:!showReview});

  }

  toggleRestaurant=()=>{
    const { toggleRestaurant } = this.state;
    this.setState({toggleRestaurant:!toggleRestaurant});
  }

  render(){
    let i = 0;
    let review = this.state.review.map((rating)=>{
      return(
        <Review stars = {rating.rating} comment = {rating.text} author={rating.author_name} key={i++} />
      );
    })
    return(
      <div className="restaurant">
        <h3 className="name" onClick={this.toggleRestaurant}>
          {this.props.restaurant.name}
        </h3>
             <p className="address">
               <span className="fat">Restaurant Address: </span> <br/>{this.props.restaurant.vicinity}
            </p>
            <div className="wrapper">
              <button className="review-header button" onClick={this.handleClick}>View reviews</button>
            </div>
            <div className="review-toggle">
            {
             this.state.showReview?
              review
             :null
            }
            </div>
            <div className="wrapper">
              <button onClick = {this.toggleForm} className="button add-review"> Add review </button>
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
                  <button type="submit" className="submit"> Submit </button>
                </form>
              :null
              }
            </div>

        
      </div>
    );
  }
}


