import React from 'react'
import { connect } from 'react-redux'
import Landing from './Landing'
import { Link } from 'react-router-dom'
import wallpaper from '../img/warrior-wallpaper.png'
import {utils} from '../utils/UIUX.js'
import {addPost} from '../actions/index.js'
class CreatePost extends React.Component{

  state={
    name:'',
    avatarID: '',
    category:'Politics',
    title:'',
    body:'',
    publishStatus:'Publish!',
    allow: false,
    editMode: false
  }

  componentWillMount(){
    if(this.props.history.location.pathname !== '/create-post'){

      fetch(`http://localhost:3001/posts/${this.props.match.params.id}`,{method:'GET', headers: { 'Authorization': 'whatever-you-want' } }).then((r)=>r.json()).then((res)=>{
        const post = res;
        this.setState((prev)=>{
  return{
    name: post.name,
    avatarID: post.avatarID,
    category: post.category,
    title: post.title,
    body: post.body,
    editMode: true
  }
})
      })
    }
  }
  getImageURL= () => this.props.images.importantImagery.byId[this.props.session.selectedAvatar].imageURL
  handleInput = (type,data)=>{
    this.setState({[type]:data})

    if(this.state.category !== '' && this.state.title !== '' && this.state.body !== '' && this.state.body.length >50){
      this.setState({allow:true})
    }else if(this.state.allow){
      this.setState({allow:false})
    }
  }

  addPost = (e) => {
    this.setState({publishStatus:'Please wait...',allow:false})
    e.preventDefault()
    const timestamp = new Date().getTime()
    const id = `${this.props.session.name}-${timestamp}`
    const avatarID = this.props.session.selectedAvatar
    const author = this.props.session.name
    const {title,body,category} = this.state
    const data = {
      timestamp,
      id,
      avatarID,
      author,
      title,
      body,
      category
    }
    fetch('http://localhost:3001/posts',{ headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },method: 'POST',body: JSON.stringify(data) }).then((res)=> res.json()).then((r)=>{
      this.setState({publishStatus:'Done!',allow:false})
      this.props.dispatch(addPost(data))
      setTimeout(()=>{
        this.props.history.push('/')
        this.setState({publishStatus:'Publish!'})
      },1000)

    })


}

  componentEditUI = () =>{
    return <div>
      {this.componentCreateUI()}
    </div>
  }

  componentCreateUI = () => {
    const {session,images,categories} = this.props
    const CREATEcategories = this.props.categories.allCategories.filter((cat)=> cat !== 'All')
    const userImage = this.getImageURL()
    return <div>


      <div className="field">
        <label>Title</label>
        <input onChange={(e)=>{this.handleInput('title',e.target.value)}} value={this.state.title} type="text" placeholder="Enter the title of your article/rant" />
      </div>

      <div className="field">
        <label>Category</label>
        <select value={this.state.category} onChange={(e)=>{this.handleInput('category',e.target.value)}}>
          {CREATEcategories.map((cat)=> <option key={`CREATEPOST${cat}`} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="field">
        <label>Content</label>
        <textarea onChange={(e)=>{this.handleInput('body',e.target.value)}} value={this.state.body} type="text" placeholder="Swear words and political incorrectness encouraged. At least 50 words required!" />
      </div>







    </div>

  }

  render(){
    return this.props.session.enter
    ?<div className="ui fluid-container full-size" style={{background: `url(${wallpaper}) center`}}>
      <div className="my-header create-header">
        <p className="title">
          TheEvening
          <span className="home-doobie">Doobie</span>
          <b className="header-floaters"><Link to="/"><i className="cancel icon"></i></Link></b>
        </p>
      </div>
      <form className="ui form">
        {this.state.editMode === false && ( 
          <div className="sixteen column row">

            <div className="sixteen wide column center-align" >
              <img src={this.state.editable?this.getImageURL(this.state.avatarID):this.getImageURL(this.props.session.selectedAvatar)} className="author-image"/>
              <h1>{this.props.session.name}</h1>
            </div>
          </div>
        )}
        {this.props.history.pathname === '/create-post'?
          this.componentCreateUI()
        : this.componentEditUI()
        }
        <div className="field">

          <button onClick={(e)=>{this.addPost(e)}} className="fluid ui positive button massive" disabled = {!this.state.allow}>{this.state.publishStatus}</button>
        </div>
      </form>
    </div>
      : <Landing />

      }
      }

const matchStateToProps = (state) =>{
  return {session:state.session,images:state.images,categories: state.categories,posts: state.posts}
}
export default connect(matchStateToProps)(CreatePost)
