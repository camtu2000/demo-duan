import React , {Component} from "react";

  class ErrorForm extends Component {

    showError(){
      let err = this.props.error
     
      if(Object.keys(err).length > 0) {
        return Object.keys(err).map((key, index)=> {
          return (
            <li key={key}>{err[key]}</li>
          )
        })
      }
  
  
    }
    render() {
      return (
        <ul>
           {this.showError()}
        </ul>
      );
    }
  }
  
  export default ErrorForm;