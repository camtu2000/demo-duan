import React ,{Component} from "react";
import ErrorForm from "../ErrorForm";
import axios from "axios";


class Comment extends Component{
    constructor(props){
        super(props)
        this.state ={
            data : {},
            error_form : {},
            comment :{}
        }
        this.handleMessage = this.handleMessage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

handleMessage(e){
    this.setState({
        comment : e.target.value
    })
}

handleSubmit(e){
e.preventDefault()
let userData = JSON.parse(localStorage.getItem("tk"))
let comment =  this.state.comment
let error_form = this.state.error_form
let flag=true


if(userData == null){
    flag = false                                  
    error_form.comment = "Vui lòng đăng nhập!"
}else if(comment == ""){
        flag = false
        error_form.comment = "Vui lòng nhập bình luận!"
    }
    this.setState({
      error_form:error_form
  })  


if(flag){
    let url = "http://localhost:8080/laravel/laravel/public/api/blog/comment/" + this.props.idBlog
    let accessToken = userData.success.token
    let config={
        headers:{
            "Authorization": "Bearer "+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'                   
        }
    }
    let {comment} = this.state

    if(comment){
        const formData = new FormData();
            formData.append("id_blog",this.props.idBlog)
            formData.append("id_user",userData.Auth.id)
            formData.append("id_comment",this.props.idReplay ? this.props.idReplay : 0)
            formData.append("comment",this.state.comment)
            formData.append("image_user",userData.Auth.avatar)
            formData.append("name_user",userData.Auth.name)

        axios.post(url,formData,config)
        .then(response =>{  
                this.setState({
                    data:response.data
                })
                this.props.getData(response.data.data)
        })
        .catch(error => console.log(error))

    } 
}
    
}

render() { 
  return ( 
          <div className="replay-box">
            <div className="row">
              <div className="col-sm-12">
                  <h2>Leave a replay</h2>
                  <ErrorForm error = {this.state.error_form}/>
                  <div className="text-area">
                  <div className="blank-arrow">
                    <label>Your Name</label>
                  </div>
                  <span>*</span>
                  <textarea name="message" value={this.state.comment} rows={11} defaultValue={""} onChange={this.handleMessage} />
                  <a className="btn btn-primary" onClick={this.handleSubmit} href>post comment</a>
                </div>
              </div>
            </div>
          </div>
   );
}
}

export default Comment