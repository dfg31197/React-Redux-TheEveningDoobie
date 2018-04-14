import React from 'react'
import {connect} from 'react-redux'
import hoigh from '../img/hoigh.jpg'
import {deletePost} from '../actions/index.js'
import {Link} from 'react-router-dom'
class PostCard extends React.Component{

handleDelete = (e) =>{
  const id = this.props.post.id
  fetch(`http://localhost:3001/posts/${id}`,{method:'DELETE', headers: { 'Authorization': 'whatever-you-want' } }).then((res)=>{
    this.props.dispatch(deletePost({id}))
  })
}
  render(){
    return (
  this.props.post.deleted?
  ""
  :<div className="item" style={{position:'relative'}}>
    <div className="image">
      <img src={this.props.post.avatarURL} />
    </div>
    <div className="content">
      <Link to={`/posts/${this.props.post.id}`} className="my-header">{this.props.post.title}</Link>
      <div className="meta">
        <span>{this.props.post.author} | {this.props.post.category}</span>
        <p></p>
      </div>
      <div className="description">
        <p></p>
      </div>
      <div className="extra">
        <div className="ui label"><i className="edit icon"></i>EDIT</div>
        <div className="ui label" onClick={this.handleDelete}><i className="trash icon"></i>DELETE</div>
      </div>
      <p style={{position:'absolute',bottom:'15px',}}>{this.props.post.voteScore} Votes | {this.props.post.commentCount} Comments</p>
    </div>
  </div>
    )
  }
}

const matchStateToProps = (state,own) => {
  return {
    post: {
      ...state.posts.byId[own.id],
      avatarURL: state.images.importantImagery.byId[state.posts.byId[own.id].avatarID].imageURL
        // ISN'T NORMALIZATION FUN?
    }
  }

}
export default connect(matchStateToProps)(PostCard)
