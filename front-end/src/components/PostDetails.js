import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Landing from './Landing'
import { handleVote } from '../actions/index.js'
import {utils} from '../utils/UIUX.js'
import { commentsInitState , addComment} from '../actions/index.js'
import {categoryInitState,postInitState} from '../actions/index.js'
import Comment from './Comment'
class PostDetails extends React.Component{

  componentWillMount(){
    if(this.props.session.enter === false){
      this.props.history.push('/login')
    }
  }

  state = {
    comment: '',
    allowCommentSubmit:false
  }

  handleInput = (e) =>{
    this.setState({comment:e.target.value},()=>{
      if(this.state.comment !== ''){
        this.setState({allowCommentSubmit:true})
      }else{
        this.setState({allowCommentSubmit:false})
      }
    })


  }

  addComment = (e) =>{
    e.preventDefault()
    const timestamp = new Date().getTime()
    const parentId = this.props.match.params.id
    const id= `COMMENT${timestamp}${parentId}`
    const body = this.state.comment
    const author = this.props.session.name
    const avatarID = this.props.session.selectedAvatar
    const data = {
      timestamp,
      id,
      body,
      author,
      avatarID
    }
    this.setState({comment:''})

    fetch(`http://localhost:3001/comments`,{method:'POST',body:JSON.stringify({...data,parentId}), headers: { 'Authorization': 'whatever-you-want','content-type':'application/json' } }).then((r)=>r.json()).then((res)=>{

      this.props.dispatch(addComment({parentId,data}))
    });
  }

  componentDidMount(){
    fetch(`http://localhost:3001/posts/${this.props.match.params.id}/comments`,{method:'GET', headers: { 'Authorization': 'whatever-you-want'} }).then((r)=>r.json()).then((res)=>{

      this.props.dispatch(commentsInitState(this.props.match.params.id,res))
    })
  }

  registerVote = (id,type) =>{
    const whatever = type=='upVote'?1:-1
    const data = {option:type}
    fetch(`http://localhost:3001/posts/${this.props.match.params.id}`,{method:'POST',body:JSON.stringify(data), headers: { 'Authorization': 'whatever-you-want','content-type':'application/json' } }).then((r)=>r.json()).then((res)=>{
      this.props.dispatch(handleVote({id:this.props.match.params.id,number:whatever}))
    });
}
  PostDetailsUI = () =>{
    const post = this.props.posts.byId[this.props.match.params.id]
    const userImage = this.props.images.importantImagery.byId[this.props.session.selectedAvatar].imageURL
    const published = utils.getDate(post.timestamp)
    return (<div>    <div className="article-header">
      <p className="title">
        TheEvening
        <span className="home-doobie">Doobie</span>
        <b className="header-floaters"><Link to="/"><i className="home icon"></i></Link></b>
        <b className="header-floaters"><Link to={`/post/${post.id}/edit`}><i className="edit icon"></i></Link></b>
        <b className="header-floaters"><img src={userImage} className="small-user-image" /></b>
      </p>
    </div>
      <div className="ui grid fluid-container readable-article">

        <div className="sixteen column row  author-info">
          <div className="sixteen wide column">
            <div className="item article-info"><img className="author-image" src={this.props.images.importantImagery.byId[post.avatarID].imageURL}/></div>
            <h3>{post.author}</h3>
          </div>

        </div>
        <div className="sixteen column row author-info-details effect7">
          <div className="sixteen wide column"><h1>{post.title}</h1></div>
        </div>
        <div className="sixteen column row effect2">
          <div className="sixteen wide column post-details-article"><div className="readable-content"><p>{post.body}</p></div>
          </div>
        </div>
        <div className="sixteen column row author-info-details effect7">
          <div className="four wide column">Published on {published}</div>
          <div className="four wide column">{post.voteScore} Votes</div>
          <div className="four wide column">{post.commentCount} Comments</div>
          <div className="four wide column"><span className="plus vote-control" onClick={(e)=>{this.registerVote(this.props.match.params.id,'upVote')}}>Upvote</span> | <span className="minus vote-control" onClick={(e)=>{this.registerVote(this.props.match.params.id,'downVote')}}>Downvote</span></div>
        </div>
      </div>


      <div className="comment-section">
        <div className="ui items">
          <div className="item add-border">
            <div className="image">
              <img src={userImage} className="round-comment-image" />
            </div>
            <div className="content">
              <a className="header">{this.props.session.name}</a>
              <div className="description">
                <form className="ui reply form">
                  <div className="field">
                    <textarea placeholder="Write your thoughts on the article!" value={this.state.comment} onChange={(e)=>{this.handleInput(e)}}></textarea>
                  </div>
                  <div>
                    <button disabled = {!this.state.allowCommentSubmit} onClick={(e)=>{this.addComment(e)}}>Add Comment!</button>
                  </div>
                </form>
              </div>
              <div className="extra">
              </div>
            </div>
          </div>
          {this.props.comments.hasOwnProperty('byId') && this.props.comments.allComments.map((comment)=>{
            return this.props.comments.byId[comment].deleted?"":<Comment key={`${comment}COMMENT`} for={this.props.match.params.id} data={this.props.comments.byId[comment]} />
          })}
        </div>
      </div>
    </div>
  )}

render(){

  return this.props.session.enter
  ? this.PostDetailsUI()
  : <Landing />
}

}


const matchStateToProps = (state,own) =>{

  const {posts,session,images,comments} = state;
  return {
    posts,
    session,
    images,
    comments
  }
}

export default connect(matchStateToProps)(PostDetails)
