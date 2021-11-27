import React, {Component} from "react"
import { Link } from "react-router-dom";

class MenuLeft extends Component{
    render(){
        return (
            <div className="col-sm-3">
              <div className="left-sidebar">
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title"><Link to="/account/member">Account</Link></h4>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title"><Link to="/account/product">My Procduct</Link></h4>
                    </div>
                  </div>
              </div>
            </div>
            </div>
          );
    }
}
export default MenuLeft