import axios from "axios";
import React, {Component} from "react";
import { Link } from "react-router-dom";

class MyProduct extends Component{
    constructor(props){
        super(props)
        this.state={
          data:[]
        }
        this.renderProduct=this.renderProduct.bind(this)
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
        let url ="http://localhost:8080/laravel/laravel/public/api/user/my-product"
        axios.get(url,config)
        .then(res=>{
         this.setState({
           data:res.data.data
         })
        })
        .catch(error=>{
          console.log(error)
        })
      }

    
      renderProduct(){
        let {data} =this.state
        if(Object.keys(data).length > 0){
          return Object.keys(data).map((key,value)=>{
            let image = JSON.parse(data[key]["image"])
            return(
              <tr key={value}>  
              <td className="cart_id">
              <p>{data[key]["id"]}</p>
              </td>
              <td className="cart_name">
                <h4><a href>{data[key]["name"]}</a></h4>
              </td>
              <td className="cart_image">
              <img  className="media-object" style={{width:'100px'}} src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+ data[key]["id_user"] +"/"+image[0] }/>
              </td>
              <td className="cart_price">
                <p>{data[key]["price"]}</p>
              </td>
              <td className="cart_action">
                <Link className="cart_quantity" style={{marginRight: '60px'}} to={"/account/edit/" + data[key]["id"]}><i className="fa fa-edit" /></Link>
                <Link className="cart_quantity" to={"/account/product/delete/" + data[key]["id"]}><i className="fa fa-times" /></Link>
              </td>
          </tr> 
            )
          })
        }
      }
    render(){
        return(
            <div className="table-responsive cart_info col-sm-9">
            <table className="table table-condensed">
              <thead style={{height:'50px'}}>
                <tr className="cart_menu" style={{background:'#FE980F', color:'#fff'}}>
                  <td className="id">ID</td>
                  <td className="description">Name</td>
                  <td className="price">Image</td>
                  <td className="total">Price</td>
                  <td className="Action">Action</td>
                </tr>
              </thead>
              <tbody>     
              {this.renderProduct()}  
              </tbody>
            </table>
            <Link className="btn btn-default update" to="/account/add" >Add new</Link>
          </div>
        )
    }
}
export default MyProduct