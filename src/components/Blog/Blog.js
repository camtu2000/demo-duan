import React, {Component} from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

class Blog extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/laravel/laravel/public/api/blog')
        .then(res =>{
           this.setState({
               data: res.data.blog.data
           })
        })
        .catch(error => console.log(error))
    }

    renderData(){
        let {data} = this.state
        if(data.length > 0){
            return data.map((value, key) => {
                return (
                    <div className="single-blog-post">
                      <h3>{value['title']}</h3>
                      <div className="post-meta">
                        <ul>
                          <li><i className="fa fa-user" /> Mac Doe</li>
                          <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                          <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        <span>
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-half-o" />
                        </span>
                      </div>
                      <a href>
                        <img src={"http://localhost:8080/laravel/laravel/public/upload/Blog/image/" + value['image']} alt="" />
                      </a>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                      <Link className="btn btn-primary" to={"/blog/detail/" + value['id']}>Read More</Link>
                    </div>
                  );
            })
        }
    }

    render(){
            return (
                <div className="col-sm-9">
                  <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {this.renderData()}
                    <div className="pagination-area">
                        <ul className="pagination">
                          <li><a href className="active">1</a></li>
                          <li><a href>2</a></li>
                          <li><a href>3</a></li>
                          <li><a href><i className="fa fa-angle-double-right" /></a></li>
                        </ul>
                    </div>
                  </div>
                </div>
              );
    }

}
export default Blog