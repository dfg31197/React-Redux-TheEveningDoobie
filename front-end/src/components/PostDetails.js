import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Landing from './Landing'
import {categoryInitState,postInitState} from '../actions/index.js'
class PostDetails extends React.Component{

  PostDetailsUI = () =>{
    const post = this.props.posts.byId[this.props.match.params.id]
    const userImage = this.props.images.importantImagery.byId[this.props.session.selectedAvatar].imageURL
    return (<div>    <div className="article-header">
        <p className="title">
        TheEvening
        <span className="home-doobie">Doobie</span>
          <b className="header-floaters"><Link to="/"><i className="home icon"></i></Link></b>
          <b onClick={(e)=>{this.toggleCategoryFilter(e)}} className="header-floaters"><i className="sign out alternate icon"></i></b>
          <b className="header-floaters"><img src={userImage} className="small-user-image" /></b>
        </p>
      </div><div className="ui grid fluid-container readable-article">

      <div className="sixteen column row  author-info">
        <div className="five wide column">
          <div className="item"><img className="author-image" src={this.props.images.importantImagery.byId[post.avatarID].imageURL}/></div>
          <h3>{post.author}</h3>
        </div>
        <div className="eleven wide column">

        </div>
        </div>
      <div className="sixteen column row effect2">
        <div className="sixteen wide column post-details-article"><div className="readable-content"><p>{post.body}</p></div>
        </div>
      </div>
    </div>
  </div>
  )}

render(){
  console.log(this.props.session)
  return this.props.session.enter
  ? this.PostDetailsUI()
  : <Landing />
}

}


const matchStateToProps = (state,own) =>{

  const {posts,session,images} = state;
  return {
    posts,
    session,
    images,
  }
}

export default connect(matchStateToProps)(PostDetails)
