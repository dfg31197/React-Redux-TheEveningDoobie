import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import 'semantic-ui-css/semantic.min.css'
import {connect} from 'react-redux'
import Landing from './Landing.js'
import Home from './Home.js'
import {categoryInitState,postInitState} from '../actions'
class App extends Component {
  componentDidMount(){
    fetch('http://localhost:3001/categories',{ headers: { 'Authorization': 'whatever-you-want' } }).then((res)=>{
      return res.json()
    }).then((x)=>{
      this.props.dispatch(categoryInitState(x))
      return fetch('http://localhost:3001/posts',{ headers: { 'Authorization': 'whatever-you-want' } }).then((posts)=>{
        return posts.json()
      })
    }).then((res)=>{
      console.log(res)
      this.props.dispatch(postInitState({posts:res}))
    })

  }
  render() {
    const keys = this.props.categories.allCategories
    const {byId} = this.props.categories

    return (
      this.props.session.enter
      ?<Home />
      : <Landing />
    )
  }
}
const matchStateToProps = (state,own) => {
  //console.log(state)
  return state
}
export default connect(matchStateToProps)(App);
