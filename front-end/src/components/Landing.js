import React from 'react'
import { connect } from 'react-redux'
import {sessionInit} from '../actions'
import wallpaper from '../img/warrior-wallpaper.png'
class Landing extends React.Component{
   state = {
     selectedAvatar: '',
     name:''
   }
   name = ''
   handleInput = (e) => {
     this.setState({name:this.name.value})
   }
  goToDashboard = (e) =>{
    if(this.state.name !== '' && this.state.selectedAvatar !== ''){
      this.props.dispatch(sessionInit({name:this.state.name,selectedAvatar:this.state.selectedAvatar}))
    }
  }

  selectThisWarrior = (warrior) =>{
    this.setState({selectedAvatar: warrior})
  }
  render(){
    const warriors = this.props.session.avatarsURL
    return (

      <div className="ui fluid container landing" style={{background: `url(${wallpaper}) center`}}>
        <div className="my-header">
          <p className="title">
            TheEvening
            <span className="home-doobie">Doobie</span>
          </p>
        </div>

        <div className="landing-input-field">
          <div className="ui huge fluid input">

            <input onChange={(e)=>{this.handleInput(e)}} ref={(val)=> this.name = val} type="text" placeholder="Your Name" />

          </div>
        </div>
        <h1>Choose your avatar</h1>
        <div className="avatar-field ui six column doubling stackable grid container">
          {
            warriors.map((warrior,index)=><div key={`warrior${index}`} className='column warrior-img' onClick={(e)=>{this.selectThisWarrior(warrior)}}>
              <img style={this.state.selectedAvatar == warrior?{border:`5px solid #212121`}:{}} src={this.props.images.importantImagery.byId[warrior].imageURL} />
            </div>)
          }

        </div>
        <h1 className='letsGo' onClick={(e)=>{this.goToDashboard(e)}}><span>GO</span></h1>
      </div>


    );
  }
}
const matchStateToProps = (state) => {
  return {
    session:{
      ...state.session,
      avatarsURL: state.images.importantImagery.allImages
    },
    images: {
      ...state.images
    }
  }
}
export default connect(matchStateToProps)(Landing)
