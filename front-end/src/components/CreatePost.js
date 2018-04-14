import React from 'react'
import { connect } from 'react-redux'

class CreatePost extends React.Component{


  render(){
    return <div>Yoda</div>
  }
}

const matchStateToProps = (state) =>{
  return {...state.session}
}
export default connect(matchStateToProps)(CreatePost)
