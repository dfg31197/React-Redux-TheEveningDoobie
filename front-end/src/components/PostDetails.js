import React from 'react'
import { connect } from 'react-redux'

class PostDetails extends React.Component{

render(){
  console.log("postcarddetals")
  return <h1>Hello</h1>
}

}


const matchStateToProps = (state,own) =>{
  return state;
}

export default connect(matchStateToProps)(PostDetails)
