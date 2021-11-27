import React ,{Component} from "react";

class ListComment extends Component{
  constructor(props){
    super(props)
    this.renderComment  = this.renderComment.bind(this)
    this.handleReplay   = this.handleReplay.bind(this)
  }
  handleReplay(e){
    this.props.getIdComment(e.target.id)
  }

  renderComment(){
    let dt = this.props.comment
    if(dt.length>0){
        return dt.map((value, key)=>{
          if(value.id_comment == 0){
            return(
              <div>
                <ul>
                         <li className="media">
                        <a className="pull-left" href="#">
                            <img   style={{width: '121px', height: '86px'}} className="media-object" src={"http://localhost:8080/laravel/laravel/public/upload/user/avatar/" + value.image_user} alt="" />
                          </a>
                          <div className="media-body">
                            <ul className="sinlge-post-meta">
                              <li><i className="fa fa-user" />{value.name_user}</li>
                              <li><i className="fa fa-clock-o" /> {value.created_at}</li>
                              <li><i className="fa fa-calendar" /> {value.updated_at}</li>
                            </ul>
                            <p> {value.comment} </p>
                            <a className="btn btn-primary" id={value.id} onClick={this.handleReplay}><i className="fa fa-reply" />Replay</a>
                          </div>
                        </li>

                        {dt.map((value2, j) => {
                          if(value.id==value2.id_comment){
                            return (
                              <li className="media second-media">
                                <a className="pull-left" href="#">
                                  <img style={{width: '121px', height: '86px', marginLeft: '45px',marginTop: '10px'}}className="media-object" src={"http://localhost:8080/laravel/laravel/public/upload/user/avatar/" + value2.image_user} alt="" />
                                </a>
                                <div className="media-body">
                                  <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user" />{value2.name_user}</li>
                                    <li><i className="fa fa-clock-o" /> {value2.created_at}</li>
                                    <li><i className="fa fa-calendar" /> {value2.updated_at}</li>
                                  </ul>
                                  <p>{value2.comment}</p>
                                  <a className="btn btn-primary" id={value2.id} onClick={this.handleReplay}><i className="fa fa-reply" />Replay</a>
                                </div>
                              </li>
                            );
                          }
                        })
                        }
                        </ul>
              </div>
          )
          }
            })
            }
    }


    render(){
        return(
            <div>
              {this.renderComment()}
            </div>
        )
    }
}

export default ListComment