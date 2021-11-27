import axios from "axios"
import React, {Component} from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../AppContext"

class Cart extends Component{
  static contextType = AppContext

    constructor(props){
      super(props)
      this.state={
        data:[],
        total:0
      }
      this.renderData=this.renderData.bind(this)
      this.IncreaseQty=this.IncreaseQty.bind(this)
      this.DecreaseQty=this.DecreaseQty.bind(this)
      this.removeItem=this.removeItem.bind(this)
      this.handleTotal=this.handleTotal.bind(this)
    }

    componentDidMount(){
      let getCart = JSON.parse(localStorage.getItem("cart"))
        axios.post("http://localhost:8080/laravel/laravel/public/api/product/cart", getCart)
        .then(res=>{
          console.log(res)
          let data = res.data.data;
          let tong = 0
          if(Object.keys(data).length>0){
            Object.keys(data).map((key,value)=>{
              tong = tong + (data[key]['price']*data[key]['qty'])
            })
          }  
          this.setState({
            total:tong,
            data:data
          })  
        })
        
        .catch(error=>{ 
          console.log(error)
        })
    }

        IncreaseQty(e){
          let getId = e.target.name
          let {data,total} = this.state
          Object.keys(data).map((key,value)=>{
            if(getId==data[key]['id']){
              data[key]['qty']+= 1
            }  
          })

          let getPrice = e.target.id
          total =  total + parseInt(getPrice)

          this.setState({
            data,
            total
          })

         

          let id =  e.target.name
          let kt = JSON.parse(localStorage.getItem("cart"))
          if(kt){
            Object.keys(kt).map((key,value)=>{
              if(key==id){
                kt[key] += 1
              }
            })
            localStorage.setItem("cart",JSON.stringify(kt))
          }
        }

        DecreaseQty(e){
          let getId = e.target.name
          let {data,total} = this.state
          Object.keys(data).map((key,value)=>{
            if(getId==data[key]['id']){
              data[key]['qty']-= 1
            }
          })

            let getPrice = e.target.id
            total =  parseInt(total) - parseInt(getPrice)

          this.setState({
            data,
            total
          })
          let id =  e.target.name
          let kt = JSON.parse(localStorage.getItem("cart"))
          if(kt){
            Object.keys(kt).map((key,value)=>{
              if(key==id){
                kt[key] -= 1
              }
            })
            localStorage.setItem("cart",JSON.stringify(kt))
          }
            }

        removeItem(e){
          let getId = e.target.name
          let {data,total} = this.state
            Object.keys(data).map((key,value)=>{
              if(data[key]['id']==getId){
                delete data[key]
              }
            })


            let getTotal = e.target.id
            total =  parseInt(total) - parseInt(getTotal)

          this.setState({
            data,
            total
          })
            let id =  e.target.name
            let kt = JSON.parse(localStorage.getItem("cart"))
            if(kt){
              Object.keys(kt).map((key,value)=>{
                if(key==id){
                  delete kt[key]
                }
              })
              this.context.stateCart(Object.keys(data).length)
              localStorage.setItem("cart",JSON.stringify(kt))
            }
        }

    renderData(){
      let {data} =  this.state
      if(Object.keys(data).length>0){
        return Object.keys(data).map((key,value)=>{
          let image = JSON.parse(data[key]["image"])
          let total = data[key]['price']*data[key]['qty']
          return (
            <tr>
            <td className="cart_product">
              <a href><img style={{width:'100px',height:'100px'}} src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+ data[key]["id_user"] +"/"+image[0] } alt="" /></a>
            </td>
            <td className="cart_description">
              <h4><a href>{data[key]['name']}</a></h4>
              <p>Web ID: {data[key]['id']}</p>
            </td>
            <td className="cart_price">
              <p>${data[key]['price']}</p>
            </td>
            <td className="cart_quantity">
              <div className="cart_quantity_button">
                <a className="cart_quantity_up" id={data[key]['price']} name={data[key]['id']} onClick={this.IncreaseQty}> + </a>
                <input className="cart_quantity_input" type="text" name={data[key]['id']} value={data[key]['qty']} autoComplete="off" size={2} />
                <a className="cart_quantity_down" id={data[key]['price']} name={data[key]['id']} onClick={this.DecreaseQty}> - </a>
              </div>
            </td>
            <td className="cart_total">
              <p className="cart_total_price">${total}</p>
            </td>
            <td className="cart_delete">
              <a className="cart_quantity_delete" id={total} name={data[key]['id']} onClick={this.removeItem}><i className="fa fa-times" /></a>
            </td>
          </tr>
          );
        })

      }
    }


    handleTotal(){
      return(
        <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>Get Quotes</a>
                <a className="btn btn-default check_out" href>Continue</a>
              </div>
            </div>
            <div className="col-sm-6">
            <div className="total_area">
                <ul>
                  <li>Cart Sub Total <span>${this.state.total}</span></li>
                  <li>Eco Tax <span>$2</span></li>
                  <li>Shipping Cost <span>Free</span></li>
                  <li>Total <span></span></li>
                </ul>
                <a className="btn btn-default update" href>Update</a>
                <a className="btn btn-default check_out" href>Check Out</a>
              </div>
            </div>
          </div>
        </div>
        </section>
    );
    }

    render(){
        return (
          <>
            <section id="cart_items">
              <div className="container">
                <div className="breadcrumbs">
                  <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li className="active">Shopping Cart</li>
                  </ol>
                </div>
                <div className="table-responsive cart_info">
                  <table className="table table-condensed">
                    <thead>
                      <tr className="cart_menu">
                        <td className="image">Item</td>
                        <td className="description" />
                        <td className="price">Price</td>
                        <td className="quantity">Quantity</td>
                        <td className="total">Total</td>
                        <td />
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderData()}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            {this.handleTotal()}
            </>
          );
    }
}
export default Cart