import axios from "axios";
import React, {Component} from "react";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

class blogdetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : {},
            idBlog : this.props.match.params.id,
            comment : {},
            listCmt: {},
        }
        this.getData = this.getData.bind(this)
        this.renderData=this.renderData.bind(this)
        this.getIdComment=this.getIdComment.bind(this)
    }
    componentDidMount(){
        axios.get("http://localhost:8080/laravel/laravel/public/api/blog/detail/"+ this.props.match.params.id)
        .then(res =>{
            this.setState({
                data:res.data.data,
                listCmt :res.data.data.comment,
                id:res.data.data.comment.id
                
            })
        })
        .catch(error => console.log(error))
    }

    getIdComment(id){
        this.setState({
            idReplay: id
         })
    }

    getData(data){
        this.setState({
           listCmt: this.state.listCmt.concat(data)
        })
    }

    renderData(){
        let {data} = this.state
        if(Object.keys(data).length>0){
            return(
                <div className="single-blog-post">
                <h3>{data["title"]}</h3>
                <div className="post-meta">
                <ul>
                    <li><i className="fa fa-user" /> Mac Doe</li>
                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                
                </div>
                <a href>
                <img src={"http://localhost:8080/laravel/laravel/public/upload/Blog/image/"+ data["image"]}/>
                </a>
                <p>
                    {data["content"]}
                </p> <br />
                <div className="pager-area">
                <ul className="pager pull-right">
                    <li><a href="#">Pre</a></li>
                    <li><a href="#">Next</a></li>
                </ul>
                </div>
            </div>
            )
        }
    }
    render() { 
        return ( 
            <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {this.renderData()}
                <Rate idBlog = {this.state.idBlog}/>
                <div className="response-area">
                    <h2>RESPONSES</h2>
                </div> 
                <ListComment comment={this.state.listCmt} getIdComment = {this.getIdComment}/>
                <Comment idBlog = {this.state.idBlog} getData = {this.getData} idReplay= {this.state.idReplay}/>
            </div>
        </div>
         );
    }
}
export default blogdetail