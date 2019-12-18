import React, { Component } from 'react';


export default class Form extends Component{
    constructor(props){
        super(props);
        this.state={
          toggleForm:false
        };
        this.coordinates = 0;
        this.toggleForm = false;
        this.object = 0;
    }


    mapClickHandler=()=>{
      if(window.google){
        const map = this.props.map

        map.addListener('click',(e)=>{
          console.log("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
          this.coordinates = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng() 
          };
          console.log(this.coordinates);
          this.state.toggleForm = !this.state.toggleForm;
          this.setState({
            toggleForm:this.state.toggleForm
          })
          console.log(this.state.toggleForm)
        });
      }
    }

    handleSubmit=(event)=>{
        const form = event.target;
        //will not rerender browser
        event.preventDefault();
        /*const formData = new FormData(event.target);
        console.log(formData)
        */
       if(!event.target.checkValidity()){
         //form is invalid!
         console.log("Invalid!")
         return;
       }else{
         //form is valid
         let name = form.elements.resName.value;
         let address = form.elements.address.value;
         let lat = this.coordinates.lat;
         let lng = this.coordinates.lng;
         let review = form.elements.review.value;
         let rating = Number(form.elements.quantity.value);
         
          //save in an object
         let object = {
          "name":name,
          "vicinity":address,
          "lat":lat,
          "long":lng,
          "reviews":[
            {
              "author_name":"Anonymous",
              "rating":rating,
              "text":review
            }
         ],
         "rating":rating
        };

        this.object = object;
  
         this.state.toggleForm = !this.state.toggleForm;
         this.setState({
          toggleForm:this.state.toggleForm
        })
        this.sendData();
       }
    
      }

      sendData=()=>{
        //sends object to the parent and calll callbackfunction 
        this.props.parentCallback(this.object);
      }

      render(){
          return(
            <div>
              {
                this.state.toggleForm?
                <form onSubmit={this.handleSubmit} className="popUpForm">
                  <label className="info-name">Restaurant name:</label><br/>
                  <input name="resName" type="text" placeholder="Enter Name" required/> 
        
                  <br/>
                  <label className="info-name">Address:</label><br/>
                  <input type="text" name="address" placeholder="Address" required/>
                  
                  <br/>
                  <label className="info-name">Review:</label><br/>
                  <input type="text" name="review" placeholder="Review" required/>

                  <br/>
                  <label className="info-name">Rating:</label><br/>
                  <input type="number" name="quantity" min="1" max="5" required/>

                  <br/>
                  <input type="submit" value="Submit"/>
                </form>
                :null
              }

            </div>
          )
      }
}