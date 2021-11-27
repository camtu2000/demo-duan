import axios from "axios";
import React, {Component} from "react";
import ErrorForm from "../ErrorForm";
import Register from "./Register";
import {AppContext} from '../AppContext';

class Login extends Component{
  static contextType =  AppContext;

  constructor(props){
    super(props)
      this.state = {
          email: "",
          password : "",
          level: "0",
          error_form : {}
      };
      this.handleInput = this.handleInput.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Lấy value của các input
  handleInput (e){
    let nameInput = e.target.name
    this.setState({
      [nameInput]: e.target.value
    })
  }

    // Submit Form
    
  handleSubmit(e){
    e.preventDefault()
    let email = this.state.email
    let password = this.state.password
    let error_form = this.state.error_form
    let flag = true
    
    error_form.email = error_form.password = ""; 

    if(email == ""){
      error_form.email = "Vui lòng nhập email"
      flag = false
    }

    if(password == ""){
      error_form.password = "Vui lòng nhập mật khẩu"
      flag = false
    }

    if(!flag){
      this.setState({
        error_form: error_form
      })
    }else{
      const data = {
        email: this.state.email,
        password: this.state.password,
        level: this.state.level
      }
      axios.post("http://localhost:8080/laravel/laravel/public/api/login", data)
      .then(res => {
        if(res.data.errors){
          this.setState({
            error_form : res.data.errors
          })
        }else{
          
            localStorage.setItem("tk",JSON.stringify(res.data)) 
            this.context.loginContext(true)               
            this.props.history.push('/')
        }

      })
      .catch(error => {
        console.log(error)
    })
    
  }
  }


  render(){
      return (
          <>
          <div className="col-sm-4">
            <div className="login-form">{/*login form*/}
              <h2>Login to your account</h2>
              <form onSubmit = {this.handleSubmit}>
              <ErrorForm error = {this.state.error_form}/>
              <input type="email" name="email"  placeholder="Email Address" onChange={this.handleInput} value={this.state.email} />
              <input type="password" name="password" placeholder="Password" onChange={this.handleInput} value={this.state.password} />
                <span>
                  <input type="checkbox" className="checkbox" /> 
                  Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">Login</button>
              </form>
            </div>{/*/login form*/}
          </div>
          <div className="col-sm-1">
              <h2 className="or">OR</h2>
          </div>
          <Register/>
          </>
        )
  }}
export default Login