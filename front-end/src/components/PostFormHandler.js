import React from 'react'
import { connect } from 'react-redux'
import Landing from './Landing'
import Error from './Error.js'
import { Link } from 'react-router-dom'
import { editPost } from '../actions/index.js'
import wallpaper from '../img/warrior-wallpaper.png'
import {utils} from '../utils/UIUX.js'
import {addPost} from '../actions/index.js'
class PostFormHandler extends React.Component{

  state={
    author:'',
    avatarID: '',
    category:'Politics',
    title:'',
    body:'',
    publishStatus:'Publish!',
    allow: false,
    editMode: false,
    deleted: false
  }

  componentDidMount(){
    if(this.props.history.location.pathname !== '/create-post'){

      fetch(`http://localhost:3001/posts/${this.props.match.params.id}`,{method:'GET', headers: { 'Authorization': 'whatever-you-want' } }).then((r)=>r.json()).then((res)=>{
        const post = res;
        if(post.hasOwnProperty('avatarID')){
          this.setState((prev)=>{
    return{
      author: post.author,
      avatarID: post.avatarID,
      category: post.category,
      title: post.title,
      body: post.body,
      editMode: true,
    }
  })
}else{
  this.setState({deleted:true})
}
      })
    }
  }
  getImageURL= (id) => this.props.images.importantImagery.byId[id].imageURL
  handleInput = (type,data)=>{
    this.setState({[type]:data})
    console.log(this.state.author)
    if(this.state.editMode){
      if(this.state.category !== '' && this.state.title !== '' && this.state.body !== '' && this.state.body.length >50 && this.state.author != ''){
        this.setState({allow:true})
      }else{
        this.setState({allow:false})
      }

    }else{
      if(this.state.category !== '' && this.state.title !== '' && this.state.body !== '' && this.state.body.length >50){
        this.setState({allow:true})
      }else{
        this.setState({allow:false})
      }
    }

  }

  addPost = (e) => {
    this.setState({publishStatus:'Please wait...',allow:false})
    e.preventDefault()
    if(this.state.editMode){
      let editData = {
        avatarID: this.state.avatarID,
        author: this.state.author,
        title: this.state.title,
        body: this.state.body,
        category: this.state.category
      }
      fetch(`http://localhost:3001/posts/${this.props.match.params.id}`,{ headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },method: 'PUT',body: JSON.stringify(editData) }).then((res)=> res.json()).then((r)=>{
        this.setState({publishStatus:'Done!',allow:false})
        editData = {...editData,id:this.props.match.params.id}
        this.props.dispatch(editPost(editData))
        this.setState({publishStatus:'Publish!'})
        setTimeout(()=>{
          this.props.history.push('/')
        },2000)

    })}else{

      const timestamp = new Date().getTime()
      const id = `${this.props.session.author}-${timestamp}`
      const avatarID = this.props.session.selectedAvatar
      const author = this.props.session.name
      const {title,body,category} = this.state
      const commentCount = 0
      const voteScore = 1
      let data = {
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
        data = {...data,
              commentCount,
              voteScore,
              deleted:false}
        this.props.dispatch(addPost(data))
        setTimeout(()=>{
          this.props.history.push('/')
          this.setState({publishStatus:'Publish!'})
        },1000)

      })

    }



}

  componentEditUI = () =>{
    const ImportantImagery = this.props.images.importantImagery.allImages
    return <div>
      <div className="field">
        <label>Author</label>
        <input onChange={(e)=>{this.handleInput('author',e.target.value)}} value={this.state.author} type="text" placeholder="Author's name" />
      </div>

      <div className="field">
        <label>Avatar</label>
        <select value={this.state.avatarID} onChange={(e)=>{this.handleInput('avatarID',e.target.value)}}>
          {ImportantImagery.map((image)=> <option key={`ImportantImage${image}`} value={image}>{image}</option>)}
        </select>
        <img src={this.state.avatarID && this.getImageURL(this.state.avatarID)} className="round-comment-image" />
      </div>
      {this.componentCreateUI()}
    </div>
  }


  componentCreateUI = () => {
    const {session,images,categories} = this.props
    const CREATEcategories = this.props.categories.allCategories.filter((cat)=> cat !== 'All')
    const userImage = this.getImageURL(session.selectedAvatar)
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
    console.log(this.props)
    return this.state.deleted || !this.props.posts.hasOwnProperty('byId')?<Error />:this.props.session.enter? <div className="ui fluid-container full-size" style={{background: `url(${wallpaper}) center`}}>
      <div className="my-header create-header">
        <p className="title">
          TheEvening
          <span className="home-doobie">Doobie</span>
          <b className="header-floaters"><Link to="/"><i className="cancel icon"></i></Link></b>
        </p>
      </div>
      <form className="ui form center-align">
        {this.state.editMode === false && (
          <div className="sixteen column row">

            <div className="sixteen wide column center-align" >
              <img src={this.state.editable?this.getImageURL(this.state.avatarID):this.getImageURL(this.props.session.selectedAvatar)} className="author-image"/>
              <h1>{this.props.session.name}</h1>
            </div>
          </div>
        )}
        {console.log(this.state.editMode)}
        {this.state.editMode?
          this.componentEditUI()
        : this.componentCreateUI()
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
export default connect(matchStateToProps)(PostFormHandler)
