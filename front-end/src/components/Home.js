import React from 'react'
import Error from './Error.js'
import { connect } from 'react-redux'

class Home extends React.Component{

  render(){
    const category = this.props.categories.byId
console.log(this.props)
    return (
      <div>
  <div className="ui five column doubling stackable grid fluid container">
{      this.props.categories.allCategories.map((cat)=>{
        return (
  <div key={cat} className="column category-cards">
  <img src={this.props.categories.byId[cat].imgsrc}/>
  <h3>{cat}</h3>
  </div>

        )
      })}
      </div>

      </div>
    )
  }
}

const matchStateToProps = (state,own) => {
  return state;
}
export default connect(matchStateToProps)(Home)
