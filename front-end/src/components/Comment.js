import React from 'react'
import { connect } from 'react-redux'
import { handleVoteComments ,actionUpdateComment, actionDeleteComment} from '../actions/index.js'
import {utils} from '../utils/UIUX.js'
class Comment extends React.Component{

state = {
  edit:false,
  author:'',
  body:'',
  allowSubmit:false
}

getImageURL= (id) => this.props.images.importantImagery.byId[id].imageURL

registerVote = (abc,type) =>{
  const id = this.props.data.id
  const whatever = type=='upVote'?1:-1
  const dataCOMMENT = {option:type}
  fetch(`http://localhost:3001/comments/${this.props.data.id}`,{method:'POST',body:JSON.stringify(dataCOMMENT), headers: { 'Authorization': 'whatever-you-want','content-type':'application/json' } }).then((r)=>r.json()).then((res)=>{
    this.props.dispatch(handleVoteComments({id,number:whatever}))
  });

}
handleSubmission = (type) =>{
  const {data} = this.props
  if(type === 'cancel'){
    this.setState({author:data.author,body:data.body,edit:false})
  }
}
updateComment = (id,parentId) =>{
  const data = {
    author:this.state.author,
    body:this.state.body,
    timestamp: Date.now()
  }
  fetch(`http://localhost:3001/comments/${id}`,{method:'PUT',body:JSON.stringify({...data,id}), headers: { 'Authorization': 'whatever-you-want','content-type':'application/json' } }).then((r)=>r.json()).then((res)=>{
    this.props.dispatch(actionUpdateComment({...data,id}))
    this.setState({edit:false})
  });
}

deleteComment = (id,parentId) =>{
  fetch(`http://localhost:3001/comments/${id}`,{method:'DELETE', headers: { 'Authorization': 'whatever-you-want'} }).then((r)=>r.json()).then((res)=>{
    this.props.dispatch(actionDeleteComment({id,parentId}))
  });
}

changeEditableState = ()=>{
  this.setState({edit:true})
}

componentDidMount(){
  this.setState({author:this.props.data.author,body:this.props.data.body})
}

handleInput = (type,val) =>{

  this.setState({[type]:val},()=>{
    if(this.state.body !== '' && this.state.author !== ''){
      this.setState({allowSubmit:true})
    }else{
      this.setState({allowSubmit:false})
    }
  })
}
  render(){
    const {data} = this.props
  return  <div className="item add-border">
    {
      this.state.edit
        ?<span className="comment-control-floaters" onClick={()=>{this.handleSubmission('cancel')}}>Cancel</span>
        :<div>
          <span className="comment-control-floaters" onClick={(e)=>{this.changeEditableState()}}> EDIT </span> |

          <span className="comment-control-floaters" onClick={(e)=>{this.deleteComment(data.id,data.parentId)}}> DELETE </span>
        </div>
    }
    <div className="image">
      <img src={this.getImageURL(data.avatarID)} className="round-comment-image" />
    </div>
    <div className="content">
      {this.state.edit? <input type="text" value={this.state.author} onChange={(e)=>{this.handleInput('author',e.target.value)}} className="header" />:<a className="header">{data.author}</a>}
      <div className="meta">
        <span>{utils.getDate(data.timestamp)}</span>
      </div>
      <div className="description">
        {this.state.edit? <textarea type="text" value={this.state.body} onChange={(e)=>{this.handleInput('body',e.target.value)}} className="header" />: <p>{data.body}</p>}
      </div>
      <div className="extra">
        {data.voteScore} Upvotes
      </div>


      <p><span className="plus vote-control" onClick={(e)=>{this.registerVote(e,'upVote')}}>Upvote</span> | <span className="minus vote-control" onClick={(e)=>{this.registerVote(e,'downVote')}}>Downvote</span></p>
    </div>
    {this.state.edit && <button disabled={!this.state.allowSubmit} onClick={()=>{this.updateComment(data.id,data.parentId)}}>Update Comment</button>}
  </div>
  }
}

const matchStatetoProps = (state,own) =>{
  const {images} = state
  return{
    images,
    own
  }
return {}
}

export default connect(matchStatetoProps)(Comment)
