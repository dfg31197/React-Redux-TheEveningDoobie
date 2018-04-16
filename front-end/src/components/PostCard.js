import React from 'react'
import {connect} from 'react-redux'
import hoigh from '../img/hoigh.jpg'
import {deletePost} from '../actions/index.js'
import {Link} from 'react-router-dom'
import { handleVote } from '../actions/index.js'
class PostCard extends React.Component{

  registerVote = (type) =>{
    const whatever = type=='upVote'?1:-1
    const data = {option:type}
    fetch(`http://localhost:3001/posts/${this.props.post.id}`,{method:'POST',body:JSON.stringify(data), headers: { 'Authorization': 'whatever-you-want','content-type':'application/json' } }).then((r)=>r.json()).then((res)=>{
      this.props.dispatch(handleVote({id:this.props.post.id,number:whatever}))
    });
}
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
  :<div className="item postCard" style={{position:'relative'}}>
    <div className="image">
      <img src={this.props.post.avatarURL} className="author-image"/>
    </div>
    <div className="content">
      <Link to={`/posts/${this.props.post.id}`} className="my-header"><h2>{this.props.post.title}</h2></Link>
      <div className="meta">
        <span>{this.props.post.author} | {this.props.post.category}</span>
        <p></p>
      </div>
      <div className="description">
        <p><i className="plus vote-control icon" onClick={(e)=>{this.registerVote('upVote')}}></i> | <i className="minus vote-control icon" onClick={(e)=>{this.registerVote('downVote')}}></i></p>
      </div>
      <div className="extra">
        <div className="ui label"><Link to={`/post/${this.props.post.id}/edit`}><i className="edit icon"></i>EDIT</Link></div>
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
