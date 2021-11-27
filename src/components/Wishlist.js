import axios from "axios";
import React,{Component} from "react";
import { AppContext } from "./AppContext";

class wishlist extends Component{
  static contextType = AppContext

    constructor(props){
        super(props)
        this.state={
            data:{},
            wishlist:JSON.parse(localStorage.getItem("wishlist"))
        }
        this.renderWishlist=this.renderWishlist.bind(this)
        this.removeItem=this.removeItem.bind(this)
    }

    componentDidMount(){
        let getWishlist = JSON.parse(localStorage.getItem("wishlist"))
        axios.get("http://localhost:8080/laravel/laravel/public/api/product/wishlist", getWishlist)
        .then(res=>{
            this.setState({
                data:res.data.data
            })
        })
    }

    removeItem(e){
        let getId = e.target.name
        
       
        let {wishlist} = this.state
        if(wishlist.length>0){
          wishlist.map((value,key)=>{
            if(value==getId){
              wishlist.splice(key,1)
            }
          })
        }
        this.setState({
          wishlist
        })
        this.context.stateWishlist(wishlist.length)
        localStorage.setItem("wishlist",JSON.stringify(wishlist))
      }


    renderWishlist(){
        let {data,wishlist} =  this.state
        if(wishlist.length>0){
            if(data.length>0){
                let fillterArray = data.filter(item => wishlist.includes(item.id.toString()))
                return fillterArray.map((item,i)=>{
                    let image = JSON.parse(item.image)
                    return (
                        <tr>
                        <td className="cart_product">
                            <a href><img style={{width:'100px',height:'100px'}} src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+ item.id_user +"/"+image[0] } alt="" /></a>
                        </td>
                        <td className="cart_description">
                            <h4><a href>{item.name}</a></h4>
                            <p>Web ID: {item.id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${item.price}</p>
                        </td>
                        <td className="cart_delete">
                            <a className="cart_quantity_delete" name={item.id} onClick={this.removeItem}><i className="fa fa-times" /></a>
                        </td>
                        </tr>
                    );
                })
            }
        }
    }

    render(){
        return (
            <>
            <section id="cart_items">
              <div className="container">
                <div className="breadcrumbs">
                  <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li className="active">Wishlist</li>
                  </ol>
                </div>
                <div className="table-responsive cart_info">
                  <table className="table table-condensed">
                    <thead>
                      <tr className="cart_menu">
                        <td className="image">Item</td>
                        <td className="description" />
                        <td className="price">Price</td>
                        <td />
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderWishlist()}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            </>
          );

    }
}
export default wishlist