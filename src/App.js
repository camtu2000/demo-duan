import React, {Component} from "react";
import {withRouter} from "react-router-dom"
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Head";
import MenuLeft from "./components/Layout/MenuLeft";
import { AppContext } from "./components/AppContext";
class App extends Component{
  constructor(props){
    super(props)
    this.state={
      cart:'',
      wishlist:0
    }
    this.stateloginContext=this.stateloginContext.bind(this)
    this.stateCart=this.stateCart.bind(this)
    this.stateWishlist=this.stateWishlist.bind(this)
  }

  //checkLogin
  stateloginContext(data){
    localStorage.setItem("login",JSON.stringify(data))
  }

  stateCart(qty_cart){
    this.setState({
      cart : qty_cart
    })
    localStorage.setItem("totalcart",JSON.stringify(qty_cart))
  }

  stateWishlist(qty_wishlist){
    this.setState({wishlist:qty_wishlist})
    localStorage.setItem("xxx", qty_wishlist)
  }

  render(){
    let path = this.props.location.pathname 
    return(
      <AppContext.Provider value={{
        state:this.state,
        loginContext: this.stateloginContext,
        stateCart:this.stateCart,
        stateWishlist:this.stateWishlist
      }}>
            <Header/>
              <section>
                <div className="container">
                  <div className="row">
                    {path.includes("account") || path.includes("cart") ||  path.includes("wishlist") ? "" : <MenuLeft/>}
                    {this.props.children}
                  </div>
                </div>
              </section>
            <Footer/>
      </AppContext.Provider>
    )
    }
    
}
export default withRouter(App);
