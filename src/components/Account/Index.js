import React, {Component} from 'react';
import { Route, BrowserRouter as  Router, Switch } from 'react-router-dom';
import App from './App';
import Update from './Member/Update'
import AddProduct from './Product/AddProdut';
import Delete from './Product/Delete';
import Edit from './Product/Edit';
import MyProduct from './Product/MyProduct';
import ProductDetail from './Product/ProductDetail';

class Index extends Component{
    render(){
        return(
            <App>
                <Switch>
                    <Route path='/account/member' component = {Update}/>
                    <Route path='/account/product' component = {MyProduct}/>
                    <Route path='/account/add' component={AddProduct}/>
                    <Route path='/account/edit/:id' component={Edit}/>
                    <Route path='/account/product/delete/:id' component={Delete}/>
                    <Route path='/account/product-detail/:id' component={ProductDetail}/>
                </Switch>
            </App>
        )
    }
}
export default Index