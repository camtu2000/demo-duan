import axios from "axios";
import React, {Component} from "react";
import ErrorForm from "../ErrorForm";

class Register extends Component{
    constructor(props){
        super(props)
            this.state = {
                name : "",
                email: "",
                password : "",
                phone : "",
                address: "",
                avatar: "",
                country: "",
                file:"",
                level: "0",
                error_form : {}
            };
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputFile = this.handleInputFile.bind(this)
        }

    // Lấy value của các input
    handleInput (e){
      let nameInput = e.target.name
      this.setState({
        [nameInput]: e.target.value
      })
    }

    // Mã hóa img dùng FileReader
    handleInputFile(e){
      const file = e.target.files;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          avatar: e.target.result,
          file: file[0]
        })
      };
      reader.readAsDataURL(file[0])
    }

    // Submit Form
    handleSubmit(e){
      e.preventDefault()
      let name = this.state.name
      let email = this.state.email
      let password = this.state.password
      let phone = this.state.phone
      let address = this.state.address
      let country= this.state.country
      let file = this.state.file
      let error_form = this.state.error_form
      let flag = true

      error_form.name = error_form.email = error_form.password = error_form.phone = error_form.address = error_form.file = error_form.country=""

      if(name == ""){
        error_form.name = "Vui lòng nhập họ tên"
        flag = false
      }

      if(email == ""){
        error_form.email = "Vui lòng nhập email"
        flag = false
      }

      if(password == ""){
        error_form.password = "Vui lòng nhập mật khẩu"
        flag = false
      }

      if(phone == ""){
        error_form.phone = "Vui lòng nhập số điện thoại"
        flag = false
      }

      if(address == ""){
        error_form.address = "Vui lòng nhập địa chỉ"
        flag = false
      }

      if(country == ""){
        error_form.address = "Vui lòng nhập đất nước"
        flag = false
      }


      if(file == ""){
        error_form.file = "Vui lòng chọn file"
        flag = false
      }else{
        let checkImg = ["png", "jpg","jpeg","JPG","PNG"];
          if(file.size > 1024*1024){
            error_form.file = "Kích thước file quá lớn"
            flag = false
          }else{
            let getFile = file.name.split(".")
            if (!checkImg.includes(getFile[1])){
              error_form.file = "Sai định dạng hình ảnh"
              flag = false
            }
          }
      }

      if(!flag){
        this.setState({
          error_form: error_form
        })
      }else{
        const data = {
          name : this.state.name,
          email: this.state.email,
          password: this.state.password,
          phone: this.state.phone,
          address : this.state.address,
          country : this.state.country,
          avatar : this.state.avatar,
          level: this.state.level
        }
        axios.post("http://localhost:8080/laravel/laravel/public/api/register", data)
        .then(res => {
          if(res.data.errors){
            this.setState({
              error_form : res.data.errors
            })
          }else{
            this.setState({
              name:"",
              email:"",
              password:"",
              address:"",
              country:"",
              phone:"",
              avatar:"",
              file:"",
              })
          }
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
    render(){
        return (
            <div className="col-sm-4">
              <div className="signup-form">{/*sign up form*/}
                <h2>New User Signup!</h2>
                <form onSubmit = {this.handleSubmit} enctype="multipart/form-data">
                <ErrorForm error = {this.state.error_form}/>
                  <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleInput} />
                  <input type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleInput} />
                  <input type="password" placeholder="Password" name ="password" value={this.state.password} onChange={this.handleInput} />
                  <input type="text" placeholder="Phone" name ="phone" value={this.state.phone} onChange={this.handleInput} />
                  <input type="text" placeholder="Address" name ="address" value={this.state.address} onChange={this.handleInput} />
                  <input type="text" placeholder="Country" name ="country" value={this.state.country} onChange={this.handleInput} />
                  <input type="file" placeholder="Avatar" name ="file" onChange={this.handleInputFile}/>
                  <button type="submit" className="btn btn-default">Signup</button>
                </form>
              </div>{/*/sign up form*/}
            </div>
          );
    }
    }
export default Register