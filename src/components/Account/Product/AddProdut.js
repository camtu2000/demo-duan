import React , {Component} from "react";
import ErrorForm from '../../ErrorForm';
import axios from "axios";

class AddProduct extends Component{
    constructor(props){
        super(props)
        this.state={
            id_user:"",
            token:"",
            category:'',
            brand: '',
            category1:'',
            brand1:"",
            name: "",
            image:{},
            avatar:"",
            price:"" ,
            detail:"",
            company_profile:"",
            status:1,
            sale:"",
            msg:"",
            error_form:{}
        }
        this.handleInput=this.handleInput.bind(this)
        this.handleFile =this.handleFile.bind(this)
        this.handleSubmit =this.handleSubmit.bind(this)
        this.renderCategory=this.renderCategory.bind(this)
        this.renderBrand=this.renderBrand.bind(this)
    }
    componentDidMount(){
        let url = "http://localhost:8080/laravel/laravel/public/api/category-brand"
        axios.get(url)
        .then(res=>{
         this.setState({
           brand1:res.data.brand,
           category1:res.data.category
         })
        })
        .catch(error=>{
          console.log(error)
        })
    }

handleInput(e){
    let name = e.target.name
    this.setState({
        [name]: e.target.value
    })
}

handleFile(e){
    let file = e.target.files
    this.setState({
        image: file
    })
}

handleSubmit(e){
    e.preventDefault()
 let {category, brand, name, image,price,detail,company_profile,status,sale,error_form,id_user } = this.state
 let userData = JSON.parse(localStorage.getItem("tk"))
 let flag = true
 error_form.category  = error_form.brand = error_form.name = error_form.image = error_form.web_id = error_form.price= error_form.sale = error_form.condition = error_form.detail = error_form.company_profile ="";
 if(category == ''){
    error_form.category  = "chua chon category"
    flag = false;
 }

 if(brand == ''){
    error_form.brand  = "chua chon brand"
    flag = false;
 }

 if(name == ""){
    error_form.name  = "chua dien ho va ten"
    flag = false;
 }

 if(Object.keys(image).length == 0){
    error_form.image  = "chua chon hinh anh"
    flag = false;
 }else if(Object.keys(image).length > 3){
    error_form.image  = "chi chon toi da 3 hinh anh"
    flag = false;
 }else{
    let CheckIMG = ["jpg","JPG","jpeg","JPEG","PNG","png"];
    Object.keys(image).map((item,value)=>{
        let split = (image[item]["type"]).split("/")
        if(!CheckIMG.includes(split[1])){
            error_form.image  = "sai file anh"
            flag = false;
        }else if(image[item]["size"] > 1024 * 1024 ){
            error_form.image  = "kich thuoc anh qua lon"
            flag = false;
        }
    })
 }

 if(price == ""){
    error_form.price  = "chua nhap gia tien"
    flag = false;
 }

 if(detail == ""){
    error_form.detail  = "chua nhap mo ta san pham"
    flag = false;
 }

 if(company_profile == ""){
    error_form.company_profile  = "chua nhap ho so cong ty"
    flag = false;
 }

 if(!flag){
    this.setState({
        error_form: error_form
     })    
 }else{
    let formdata =  new FormData()
    formdata.append("name",name)
    formdata.append("price",price)
    formdata.append("category",category)
    formdata.append("brand",brand)
    formdata.append("company",company_profile)
    formdata.append("detail",detail)
    formdata.append("status",status)
    formdata.append("sale",sale)
    formdata.append("id_user",id_user)

    Object.keys(image).map((key,value)=>{
        formdata.append("file[]", image[key])
    })

    let url = "http://localhost:8080/laravel/laravel/public/api/user/add-product"
    let accessToken = userData.success.token
    let config ={
        headers:{
          'Authorization': 'Bearer '+ accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      }

      axios.post(url,formdata,config)
      .then(res=>{
        if(res.data.errors){
          this.setState({
            error_form : res.data.errors
          })
        }
        else{
          this.setState({
            msg:"Create success"
          })
        }
    })
      .catch(error =>{
          console.log(error)
      })
 }
}

   
    renderCategory(){
    let {category1}=this.state
        return(
            Object.keys(category1).map((key,value)=>{ 
                return(
                    <option value={category1[key]["id"]} >{category1[key]["category"]}</option>
                )
            })
        )
    }

    renderBrand(){
        let {brand1}=this.state
        return(
            Object.keys(brand1).map((key,value)=>{ 
                return(
                    <option value= {brand1[key]["id"]}>{brand1[key]["brand"]}</option>
                )
            })
        )
    }

    handleSale(){
        if(this.state.status==0){
            return(
                <>
                <input style={{width:'150px'}} type="number" id="value_sale" name="sale" onChange={this.handleInput}/>%
                </>
            )
        }
    }

    render(){
        return(
            <div className="col-sm-6" >
            <div className="signup-form">
              <h2>Create product!</h2>
              <p >{this.state.msg}</p>
              <ErrorForm error = {this.state.error_form}/>
              <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.name} onChange={this.handleInput} name="name" placeholder="Name"/>
              <input type="text" value={this.state.price} onChange={this.handleInput} name="price" placeholder="Price"/>
                  <select className="id_category" onChange={this.handleInput} name="category">
                      <option value="" >Please select category</option>
                      {this.renderCategory()}
                  </select>
                <select className="id_brand" onChange={this.handleInput} name="brand">
                <option value="" >Please select brand</option>
                    {this.renderBrand()}
                </select>
                <select className="col-md-6" onChange={this.handleInput} name="status">
                    <option>Please choose status</option>
                    <option value="1">New</option>	
                    <option value="0">Sale</option>
                </select>
                {this.handleSale()}
                <input type="text" value={this.state.company_profile} onChange={this.handleInput} name="company_profile" placeholder="Company profile"/>
                <input type="file" name="image" onChange={this.handleFile} multiple/> 
                <input type="text" value={this.state.detail} onChange={this.handleInput} name="detail" placeholder="Detail"/>
                <button type="submit" className="btn btn-default" >Create</button>
              </form>
            </div>
          </div>
        )
    }
}

export default AddProduct