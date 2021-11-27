import axios from "axios";
import React, {Component} from "react";

class Delete extends Component{
    constructor(props){
        super(props)
        this.state={
          data:[]
        }
      }

      componentDidMount(){
        let userData = JSON.parse(localStorage.getItem("tk"))
        let accessToken = userData.success.token
        let config ={
            headers:{
              'Authorization': 'Bearer '+ accessToken,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            }
          }
        let url ="http://localhost:8080/laravel/laravel/public/api/user/delete-product/" + this.props.match.params.id
        axios.get(url,config)
        .then(res=>{
         this.setState({
           data:res.data.data
         })
         this.props.history.push('/account/cart')
        })
        .catch(error=>{
          console.log(error)
        })
      }

      render(){
          let {data} = this.state
          return(
              Object.keys(data).map((key,value)=>{
                  if(data[key]){
                      delete data[key]
                  }
              })
          )
      }
}
export default Delete