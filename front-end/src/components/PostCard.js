import React from 'react'
import {connect} from 'react-redux'
import hoigh from '../img/hoigh.jpg'
class PostCard extends React.Component{

  render(){

    return (

  <div className="item" style={{position:'relative'}}>
    <div className="image">
      <img src={hoigh} />
    </div>
    <div className="content">
      <a className="header">{this.props.post.title}</a>
      <div className="meta">
        <span>{this.props.post.author} | {this.props.post.category}</span>
        <p>Tutti</p>
      </div>
      <div className="description">
        <p></p>
      </div>
      <div className="extra">
        <div className="ui label">IMAX</div>
        <div className="ui label"><i className="globe icon"></i> Additional Languages</div>
      </div>
      <p style={{position:'absolute',bottom:'15px',}}>Likes | Comments</p>
    </div>
  </div>
    )
  }
}

const matchStateToProps = (state,own) => {
  return {
    post: state.posts.byId[own.id]
  }
}
export default connect(matchStateToProps)(PostCard)
