import React from 'react'
import { connect } from 'react-redux'
import Landing from './Landing'
import {categoryInitState,postInitState} from '../actions/index.js'
class PostDetails extends React.Component{

  PostDetailsUI = () =>{
    console.log(this.props)
    const post = this.props.posts.byId[this.props.match.params.id]

    return (<div className="ui grid container">
      <div className="sixteen column row">
        <div className="five wide column">
          <div className="item"><img src={this.props.images.importantImagery.byId[post.avatarID].imageURL}/></div>
          <h3>{post.author}</h3>
        </div>
        <div className="eleven wide column">

        </div>
        </div>
      <div className="sixteen column row">
        <div className="four wide column post-details-sidebar">
          But there is another category of name-calling that is also hurtful and destructive: names such as “racist,” “sexist,” “homophobe,” “anti-Semite,” “bigot,” and the like. Yet many throw these labels around at the drop of a hat, without understanding what the labels actually mean — not to mention the damage done by accusing someone of racism, sexism, etc. The accusation alone — even without merit — can be enough to besmirch a reputation, kill a career, and/or be used to invalidate a lifetime of good work.


        </div>
        <div className="twelve wide column post-details-article"><p></p>
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

  const {posts,session,images} = state;
  return {
    posts,
    session,
    images,
  }
}

export default connect(matchStateToProps)(PostDetails)
