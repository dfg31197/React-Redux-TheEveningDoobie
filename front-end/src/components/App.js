import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import 'semantic-ui-css/semantic.min.css'
import {connect} from 'react-redux'
import Landing from './Landing.js'
import Home from './Home.js'
import {categoryInitState,postInitState} from '../actions'
class App extends Component {

  componentWillMount(){
    this.props.history.push('/home')
  }

  render() {
    return (
      ""
    )
  }
}
const matchStateToProps = (state,own) => {
  //console.log(state)
  return state
}
export default connect(matchStateToProps)(App);
