import React from 'react'
import { connect } from 'react-redux'
import {categoryInitState,postInitState} from '../actions/index.js'
class Loader extends React.Component{
componentDidMount(){

  fetch('http://localhost:3001/categories',{ headers: { 'Authorization': 'whatever-you-want' } }).then((res)=>{
    return res.json()
  }).then((x)=>{
    this.props.dispatch(categoryInitState(x))
    return fetch('http://localhost:3001/posts',{ headers: { 'Authorization': 'whatever-you-want' } }).then((posts)=>{

      return posts.json()
    })
  }).then((res)=>{

    this.props.dispatch(postInitState({posts:res}))
  })

}
  render(){
    return ''
  }
}

const matchStateToProps=(state)=>{
  return state;
}

export default connect(matchStateToProps)(Loader)
