import React from 'react'
import Error from './Error.js'
import { connect } from 'react-redux'
import dashboard from '../img/dashboard-background.jpg'
import PostCard from './PostCard.js'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import { sessionLogOut, postInitState} from '../actions/index.js'
class Home extends React.Component{
  state={
    displayCategory: false,
    selectedCategory: 'All',
    sortBy:'worst'
  }

  sortEmUp = () =>{
    let allPosts;
    const logic = this.state.sortBy==='worst'? 'voteScore':'-voteScore'

       allPosts = this.props.posts.allPosts.map((post)=>{
        return this.props.posts.byId[post]
      })
      this.props.dispatch(postInitState({posts:allPosts.sort(sortBy(logic))}))

  }

  handleSortMech = (e) => {
    this.setState({sortBy:e.target.value},()=>{
      this.sortEmUp()
    })
  }

  changeFilter = (cat) =>{
    this.setState({selectedCategory:cat,displayCategory:false})
    this.props.history.push(`/home/${cat}`)
  }

  componentWillMount(){
    if(this.props.session.enter === false){
      this.props.history.push('/login')
    }

    if(this.props.match.params.hasOwnProperty('category')){
      this.setState({selectedCategory:this.props.match.params.category})
    }

  }


toggleCategoryFilter = (e) =>{
this.setState((prev)=>{return {displayCategory: !prev.displayCategory}})
}

logOut = () =>{
  this.props.dispatch(sessionLogOut())
  this.props.history.push('/login')
}
  render(){
    let counter = 0;
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
            <b className="header-floaters"><Link to="/create-post"><i className="pencil alternate icon"></i></Link></b>
            <b className="header-floaters"><img src={userImage} className="small-user-image" /></b>
            <button onClick={(e)=>{this.handleSortMech(e)}} value={this.state.sortBy === 'worst'?'best':'worst'}>Sort by {this.state.sortBy === 'worst'?'best':'worst'}</button>
          </p>


        </div>
        <div className={`ui five column doubling stackable grid fluid container ${this.state.displayCategory?'hamburger-control':'hide-item'}`}>
          {    this.props.categories.allCategories && this.props.categories.allCategories.map((cat)=>{
            return (
              <div key={`HOMEPAGE${cat}`} className={`column category-cards ${cat===this.state.selectedCategory?"selected-category":" "}`}>
                <img onClick={(e)=>{this.changeFilter(cat)}} src={this.props.categories.byId[cat].imgsrc}/>
                <h3>{cat}</h3>
              </div>

            )
          })}

        </div>
        <div className="ui divider"></div>

        <div className="all-posts ui divided items">
          {
            this.props.posts.allPosts && this.props.posts.allPosts.map((post)=>{
              if(this.props.posts.byId[post].category === this.state.selectedCategory || this.state.selectedCategory === 'All'){
                counter+=1
                return <PostCard key={`HOME${post}`} id={post}/>
              }

            }

            )}

          {counter === 0 && <h1>No entries found</h1>}
        </div>
      </div>
    )
  }
}

const matchStateToProps = (state,own) => {
  return state;
}
export default connect(matchStateToProps)(Home)
