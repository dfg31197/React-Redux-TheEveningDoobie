import React from 'react'
import { Link } from 'react-router-dom'
class Error extends React.Component{
  render(){
    return (
      <div className="error-div">
        <h1>¯\_(ツ)_/¯</h1>
        <h1>You seem to have stumbled on a resource that has been removed or is currently unavailable.</h1>

      </div>
    )
  }
}
export default Error
