import axios from "axios";
import { Component } from "react";
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:{},
            img:[],
            imgFirst:""
         }
        this.handleClick=this.handleClick.bind(this)
        this.openPopupbox=this.openPopupbox.bind(this)
        this.imgLarge=this.imgLarge.bind(this)
        this.smallImage=this.smallImage.bind(this)
    }
    componentDidMount(){
        axios.get("http://localhost:8080/laravel/laravel/public/api/product/detail/"+this.props.match.params.id)
        .then(res =>{
          let image = JSON.parse(res.data.data.image)
            this.setState({
                data:res.data.data,
                img:image,
                imgFirst : image[0]
            })
        })
        .catch(error => console.log(error))
    }
    smallImage(){
      let {img,data} = this.state
      if(img.length > 0){ 
        return img.map((value,key)=>{
          return (
            <div key = {key} className={key==0 ? "item active" : "item"}>
                {
                   img.map((value1,key1)=>{
                    return(
                      <a key={key1}><img name={value1} src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + data.id_user + "/small_" + value1} onClick={this.handleClick}/></a>
                    )
                  })
                }
            </div>
          )
        })
      }
    }
    
    handleClick(e){
      let name=e.target.name
      this.setState({
        imgFirst:name
      })
    }

    imgLarge(){
      let {data} = this.state
     
        return(
            <img id="img_main" src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+data.id_user+"/larger_"+ this.state.imgFirst }/>
          )
   
    }
    openPopupbox() {
      let {data} = this.state
      const content = <img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+data.id_user+"/"+ this.state.imgFirst } />
      PopupboxManager.open({
        content,
        config: {
          titleBar: {
            enable: true,
            text: ''
          },
          fadeIn: true,
          fadeInSpeed: 500
        }
      })
    }
    renderIfomation(){
      let {data} = this.state
      if(Object.keys(data).length>0){
                return(
                  <div className="product-information">{/*/product-information*/}
                  <img src="http://localhost:8080/laravel/laravel/public/frontend/images/product-details/new.jpg" className="newarrival" alt="" />
                  <h2>{data["name"]}</h2>
                  <p>WEB ID : {data["id"]}</p>
                  <img src="http://localhost:8080/laravel/laravel/public/frontend/images/product-details/rating.png" style={{display:'flex'}}/>
                  <span>
                    <span className="price">US ${data["price"]}</span>
                    <button type="button" className="btn btn-fefault cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </span>
                  <p><b>Availability:</b> In Stock</p>
                  <p><b>Condition:</b>{data["condition"]}</p>
                  <p><b>Brand: </b>{data["id_brand"]}</p>
                  <a href><img src="http://localhost:8080/laravel/laravel/public/frontend/images/blog/socials.png" className="share img-responsive" alt="" /></a>
                </div>
                )
            }
    }



    render() { 
        return ( 
          <div className="col-sm-9 padding-right">
            <div className="col-md-12 padding-right">
              <div className="product-details">{/*product-details*/}
                <div className="col-sm-5">
                  <div className="view-product">
                    {this.imgLarge()}
                    <a id="img_zoom" onClick={this.openPopupbox} rel="prettyPhoto"><h3>ZOOM</h3></a>
                    <PopupboxContainer/>
                  </div>
                  <div id="similar-product" className="carousel slide" data-ride="carousel">
                    {/* Wrapper for slides */}
                    <div className="carousel-inner">
                        {this.smallImage()}
                    </div>
                    {/* Controls */}
                    <a className="left item-control" href="#similar-product" data-slide="prev">
                      <i className="fa fa-angle-left" />
                    </a>
                    <a className="right item-control" href="#similar-product" data-slide="next">
                      <i className="fa fa-angle-right" />
                    </a>
                  </div>
                </div>
                <div className="col-sm-7">
                      {this.renderIfomation()}
                </div>
              </div>{/*/product-details*/}
              <div className="category-tab shop-details-tab">{/*category-tab*/}
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li><a href="#details" data-toggle="tab">Details</a></li>
                <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                <li><a href="#tag" data-toggle="tab">Tag</a></li>
                <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade" id="details">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="companyprofile">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tag">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade active in" id="reviews">
                <div className="col-sm-12">
                  <ul>
                    <li><a href><i className="fa fa-user" />EUGEN</a></li>
                    <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                    <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                  </ul>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <p><b>Write Your Review</b></p>
                  <form action="#">
                    <span>
                      <input type="text" placeholder="Your Name" />
                      <input type="email" placeholder="Email Address" />
                    </span>
                    <textarea name defaultValue={""} />
                    <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                    <button type="button" className="btn btn-default pull-right">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
         )
    }
}
 
export default ProductDetail;