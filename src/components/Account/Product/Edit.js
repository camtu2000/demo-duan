import React , {Component} from "react";
import ErrorForm from '../../ErrorForm';
import axios from "axios";

class Edit extends Component{
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
            image_old:[],
            avatar:"",
            price:"" ,
            detail:"",
            company_profile:"",
            status:1,
            sale:"",
            msg:"",
            error_form:{},
            arrCheck:[]
        }
        this.handleInput=this.handleInput.bind(this)
        this.handleFile =this.handleFile.bind(this)
        this.handleSubmit =this.handleSubmit.bind(this)
        this.renderCategory=this.renderCategory.bind(this)
        this.renderBrand=this.renderBrand.bind(this)
        this.handleImg= this.handleImg.bind(this)
        this.handleDelete= this.handleDelete.bind(this)
    }
    componentDidMount(){
        let userData = JSON.parse(localStorage.getItem("tk"))
        let accessToken = userData.success.token
        let config ={
            headers:{
              'Authorization': 'Bearer '+ accessToken,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            }
          }
        let url =("http://localhost:8080/laravel/laravel/public/api/user/product/" + this.props.match.params.id)
        axios.get(url,config)
        .then(res=>{
         this.setState({
           id_user:res.data.data.id_user,
           category:res.data.data.id_category,
           brand:res.data.data.id_brand,
           name:res.data.data.name,
           price:res.data.data.price,
           status:res.data.data.status,
           sale:res.data.data.sale,
           company_profile:res.data.data.company_profile,
           image_old:res.data.data.image,
           detail:res.data.data.detail,
           image:res.data.data.image
         })
        })
        .catch(error=>{
          console.log(error)
        })

        axios.get("http://localhost:8080/laravel/laravel/public/api/category-brand")
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
 let {category, brand, name, image,price,detail,company_profile,status,sale,error_form,id_user,image_old,arrCheck } = this.state
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
 }else if(Object.keys(image).length > 3 || Object.keys(image).length + (this.state.image_old.length - this.state.arrCheck.length) > 3){
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
    if(sale){
        formdata.append("sale",sale)
    }
    formdata.append("id_user",id_user)

    Object.keys(image).map((key,value)=>{
        formdata.append("file[]", image[key])
    })
    if(arrCheck.length > 0) {
        Object.keys(arrCheck).map((key,value)=>{
            formdata.append("avatarCheckBox[]",arrCheck[key])
        })
    }
    
    
    let url = "http://localhost:8080/laravel/laravel/public/api/user/edit-product/" + this.props.match.params.id
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
          console.log(res.data)
        if(res.data.errors){
          this.setState({
            error_form : res.data.errors
          })
        }
        else{
          this.setState({
            msg:"Edit success"
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
                <input style={{width:'150px'}} type="number" id="value_sale" name="sale" onChange={this.handleInput} value={this.state.sale}/>%
                </>
            )
        }
    }

    handleImg(){
        let {image_old} = this.state
        return(
            Object.keys(image_old).map((key,value)=>{
                return(
                    <>
                        <img className="media-object" style={{width:'100px'}} src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+ this.state.id_user +"/"+this.state.image_old[key]}/>
                        <input type="checkbox" name="image" value={this.state.image_old[key]} onClick={this.handleDelete}/>
                    </>
                )
            })
    
        )
    }

    handleDelete(e){
        let checked=e.target.checked
        let arrImg = this.state.arrCheck;
        let img = e.target.value
        if(checked){
            arrImg.push(img)
           
        }else{
            Object.keys(arrImg).map((value,key)=>{
               
                if(arrImg[value]==img){
                    arrImg.splice(value,1)
                }
            })
        }

        this.setState({
            arrCheck: arrImg
        })
       
    }



    render(){
       
        return(
            <div className="col-sm-6" >
            <div className="signup-form">
              <h2>Edit product!</h2>
              <p >{this.state.msg}</p>
              <ErrorForm error = {this.state.error_form}/>
              <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.name} onChange={this.handleInput} name="name" placeholder="Name"/>
              <input type="text" value={this.state.price} onChange={this.handleInput} name="price" placeholder="Price"/>
                  <select className="id_category" onChange={this.handleInput} name="category" value={this.state.category}>
                      <option value="" >Please select category</option>
                      {this.renderCategory()}
                  </select>
                <select className="id_brand" onChange={this.handleInput} name="brand" value={this.state.brand}>
                <option value="" >Please select brand</option>
                    {this.renderBrand()}
                </select>
                <select className="col-md-6" onChange={this.handleInput} name="status" value={this.state.status}>
                    <option>Please choose status</option>
                    <option value="1">New</option>	
                    <option value="0">Sale</option>
                </select>
                {this.handleSale()}
                <input type="text" value={this.state.company_profile} onChange={this.handleInput} name="company_profile" placeholder="Company profile"/>
                <input type="file" name="image" onChange={this.handleFile} multiple/>
                {this.handleImg()}
                <input type="text" value={this.state.detail} onChange={this.handleInput} name="detail" placeholder="Detail"/>
                <button type="submit" className="btn btn-default" >Edit</button>
              </form>
            </div>
          </div>
        )
    }
}

export default Edit

// hinh moi 
// hinh con lai: hinh cu(1,3,2) - hinh xoa(1,2) = (3)

// hinh moi + hinh con lai > 3 thi bao loi

// hinh moi va hinh xoa