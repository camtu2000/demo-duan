import axios from "axios";
import React,{Component} from "react";
import StarRatings from "react-star-ratings";
import ErrorForm from "../ErrorForm";

class Rate extends Component{
    constructor(props){
      super(props)
      this.state  = {
            data : {},
            error_form : "",
            rating: 0
      }
      this.changeRating = this.changeRating.bind(this)
    };

    changeRating( newRating) {
      let userData = JSON.parse(localStorage.getItem("tk"))
      let error_form = this.state.error_form
      let flag=true     
      
      if(userData == null){
        flag = false                                  
        error_form.rating = "Vui lòng đăng nhập!"
      }

      this.setState({
        rating: newRating,
        error_form:error_form

      });

      if(flag){
        let url = "http://localhost:8080/laravel/laravel/public/api/blog/rate/" + this.props.idBlog
        let accessToken = userData.success.token
        let config={
            headers:{
                "Authorization": "Bearer "+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'                   
            }
        }
        let {rating} = this.state
    
        if(rating){
            const formData = new FormData();
                formData.append("blog_id",this.props.idBlog)
                formData.append("user_id",userData.Auth.id)
                formData.append("rate",this.state.rating)

            axios.post(url,formData,config)
            .then(response =>{  
                    this.setState({
                        data:response.data,
                        error_form: response.data.message
                    })
            })
            .catch(error => console.log(error))
    
        } 
    }

    }

    componentDidMount(){
      axios.get("http://localhost:8080/laravel/laravel/public/api/blog/rate/"+ this.props.idBlog)
      .then(res =>{
          let data = res.data.data
          let length = Object.keys(data).length
          let sum = 0
          if(Object.keys(data).length > 0){
            Object.values(data).map((value, key) => {
              sum = parseInt(sum) + parseInt(value.rate)
          })
          }
         let average = parseFloat(sum/length)
          this.setState({
            rating : average
          })
      })
      .catch(error => console.log(error))
  }


    render(){
        return (
            <>
            <div className="rating-area">
              <ul className="ratings">
              <p> {this.state.error_form}</p>
                <li className="rate-this">Rate this item:</li>
                <li>
                <StarRatings
                  rating={this.state.rating}
                  starRatedColor="#FE980F"
                  changeRating={this.changeRating}
                  numberOfStars={6}
                  name='rating'
                />
                </li>
                <li className="color">(6 votes)</li>
              </ul>
              <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href>Pink <span>/</span></a></li>
                <li><a className="color" href>T-Shirt <span>/</span></a></li>
                <li><a className="color" href>Girls</a></li>
              </ul>
            </div>
            <div className="socials-share">
                <a href><img src="http://localhost:8080/laravel/laravel/public/frontend/images/blog/socials.png" alt="" /></a>
            </div>
            </>
          );
    }
}
export default Rate