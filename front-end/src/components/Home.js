import React from 'react'
import Error from './Error.js'
import { connect } from 'react-redux'
import dashboard from '../img/dashboard-background.jpg'
import PostCard from './PostCard.js'
import {sessionLogOut} from '../actions/index.js'
class Home extends React.Component{
  state={
    displayCategory: false
  }

toggleCategoryFilter = (e) =>{
this.setState((prev)=>{return {displayCategory: !prev.displayCategory}})
}

logOut = () =>{
  this.props.dispatch(sessionLogOut())
}
  render(){
    console.log(this.props)
    const userImage = this.props.images.importantImagery.byId[this.props.session.selectedAvatar].imageURL
    const category = this.props.categories.byId
    return (
      <div className="dashboard">
      <div className="home-header">
      <p className="title">
      TheEvening
      <span className="home-doobie">Doobie</span>
      <b onClick={(e)=>{this.toggleCategoryFilter(e)}} className="header-floaters">☰</b>
      <b onClick={(e)=>{this.logOut()}} className="header-floaters"><i className="sign out alternate icon"></i></b>
      <b className="header-floaters"><img src={userImage} className="small-user-image" /></b>
      </p>


    </div>
  <div className={`ui five column doubling stackable grid fluid container ${this.state.displayCategory?'hamburger-control':'hide-item'}`}>
{      this.props.categories.allCategories.map((cat)=>{
        return (
  <div key={cat} className="column category-cards">
  <img src={this.props.categories.byId[cat].imgsrc}/>
  <h3>{cat}</h3>
  </div>

        )
      })}

      </div>
      <div className="ui divider"></div>

      <div className="all-posts ui divided items">
        {this.props.posts.allPosts.map((post)=><PostCard key={post} id={post}/>)}
      </div>
      </div>
    )
  }
}

const matchStateToProps = (state,own) => {
  return state;
}
export default connect(matchStateToProps)(Home)
