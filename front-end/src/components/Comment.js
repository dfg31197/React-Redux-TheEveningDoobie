import React from 'react'
import { connect } from 'react-redux'
import { handleVoteComments } from '../actions/index.js'
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

handleInput = (type,val) =>{
  this.setState({[type]:val},()=>{
    if(this.state.body !== ''){
      this.setState({allowSubmit:true})
    }else{
      this.setState({allowSubmit:false})
    }
  })


}
  render(){
    const {data} = this.props
  return  <div className="item add-border">
    <div className="image">
      <img src={this.getImageURL(data.avatarID)} className="round-comment-image" />
    </div>
    <div className="content">
      <a className="header">{data.author}</a>
      <div className="meta">
        <span>{utils.getDate(data.timestamp)}</span>
      </div>
      <div className="description">
        <p>{data.body}</p>
      </div>
      <div className="extra">
        {data.voteScore} Upvotes
      </div>
      {console.log(this.props.data.id)}
      <p><span className="plus vote-control" onClick={(e)=>{this.registerVote(e,'upVote')}}>Upvote</span> | <span className="minus vote-control" onClick={(e)=>{this.registerVote(e,'downVote')}}>Downvote</span></p>
    </div>
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
