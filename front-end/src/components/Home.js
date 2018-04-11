import React from 'react'
import Error from './Error.js'
import { connect } from 'react-redux'
import dashboard from '../img/dashboard-background.jpg'
import PostCard from './PostCard.js'
class Home extends React.Component{
  state={
    displayCategory: false
  }

toggleCategoryFilter = (e) =>{
this.setState((prev)=>{return {displayCategory: !prev.displayCategory}})
}

  render(){
    const category = this.props.categories.byId
    return (
      <div className="dashboard">
      <div className="home-header">
      <p className="title">
      TheEvening
      <span>Doobie</span>
      <b onClick={(e)=>{this.toggleCategoryFilter(e)}} id="ham-burger">☰</b>
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
