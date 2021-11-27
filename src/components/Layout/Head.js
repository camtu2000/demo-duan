import React, {Component} from "react"
import {withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import Login from "../Member/Login";

class Header extends Component{
  static contextType = AppContext

  constructor(props){
    super(props)
    this.load = this.load.bind(this);
    this.renderTotalCart=this.renderTotalCart.bind(this)
    this.renderTotalWishlist=this.renderTotalWishlist.bind(this)
  }

  renderLogin(){
    let kt = JSON.parse(localStorage.getItem("login"))
    if(kt==true){
      return(
        <li><a onClick={this.load}><i className="fa fa-lock"/>Logout</a></li>
      )
    }else{
      return(
        <li><Link to="/login"><i className="fa fa-lock" /> Login</Link></li>
      )
    }
  }
    
  load(){
    localStorage.removeItem("login");
    this.props.history.push('/login')

  }

  renderTotalCart(){
    let qty_cart = JSON.parse(localStorage.getItem("totalcart"))
        return(
          <span>({qty_cart ? qty_cart : 0})</span>
        )
    }

    renderTotalWishlist(){
      let qty_wishlist = this.context.state.wishlist ? this.context.state.wishlist : localStorage.getItem("xxx")
    
          return(
            <span>({qty_wishlist ? qty_wishlist : 0})</span>
          )
      }

  render(){
      return (
          <>
          <header id="header">{/*header*/}
            <div className="header_top">{/*header_top*/}
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="contactinfo">
                      <ul className="nav nav-pills">
                        <li><a href="#"><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
                        <li><a href="#"><i className="fa fa-envelope" /> info@domain.com</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="social-icons pull-right">
                      <ul className="nav navbar-nav">
                        <li><a href="#"><i className="fa fa-facebook" /></a></li>
                        <li><a href="#"><i className="fa fa-twitter" /></a></li>
                        <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                        <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                        <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>{/*/header_top*/}
            <div className="header-middle">{/*header-middle*/}
              <div className="container">
                <div className="row">
                  <div className="col-md-4 clearfix">
                    <div className="logo pull-left">
                      <Link to="/"><img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/logo.png" alt="" /></Link>
                    </div>
                    <div className="btn-group pull-right clearfix">
                      <div className="btn-group">
                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                          USA
                          <span className="caret" />
                        </button>
                        <ul className="dropdown-menu">
                          <li><a href>Canada</a></li>
                          <li><a href>UK</a></li>
                        </ul>
                      </div>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                          DOLLAR
                          <span className="caret" />
                        </button>
                        <ul className="dropdown-menu">
                          <li><a href>Canadian Dollar</a></li>
                          <li><a href>Pound</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 clearfix">
                    <div className="shop-menu clearfix pull-right">
                      <ul className="nav navbar-nav">
                        <li><Link to="/account/member"><i className="fa fa-user" /> Account</Link></li>
                        <li><Link to="/wishlist"><i className="fa fa-star" /> Wishlist{this.renderTotalWishlist()}</Link></li>
                        <li><a href="checkout.html"><i className="fa fa-crosshairs" /> Checkout</a></li>
                        <li><Link to="/cart"><i className="fa fa-shopping-cart" /> Cart{this.renderTotalCart()}</Link></li>
                        {this.renderLogin()}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>{/*/header-middle*/}
            <div className="header-bottom">{/*header-bottom*/}
              <div className="container">
                <div className="row">
                  <div className="col-sm-9">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                    </div>
                    <div className="mainmenu pull-left">
                      <ul className="nav navbar-nav collapse navbar-collapse">
                        <li><Link to="/" className="active">Home</Link></li>
                        <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down" /></a>
                          <ul role="menu" className="sub-menu">
                            <li><a href="shop.html">Products</a></li>
                            <li><a href="product-details.html">Product Details</a></li> 
                            <li><a href="checkout.html">Checkout</a></li> 
                            <li><Link to="/cart">Cart</Link></li> 
                            <li><Link to="/login">Login</Link></li> 
                          </ul>
                        </li> 
                        <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down" /></a>
                          <ul role="menu" className="sub-menu">
                            <li><Link to ="/blog/list">Blog List</Link></li>
                            <li><a href="blog-single.html">Blog Single</a></li>
                          </ul>
                        </li> 
                        <li><a href="404.html">404</a></li>
                        <li><a href="contact-us.html">Contact</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="search_box pull-right">
                      <input type="text" placeholder="Search" />
                    </div>
                  </div>
                </div>
              </div>
            </div>{/*/header-bottom*/}
          </header>
          </>
        );
  }
}
export default withRouter(Header)