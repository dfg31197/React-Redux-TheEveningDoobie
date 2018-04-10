import {INIT_STATE} from '../actions'
import { combineReducers } from 'redux'
import {CAT_INIT_STATE,POSTS_INIT_STATE,SESSION_INIT} from '../actions'
import hoigh from '../img/hoigh.jpg'
import adolf from '../img/adolf.jpg'
import alex from '../img/alex.jpeg'
import doggo from '../img/doggo.jpg'
import patriarchy from '../img/patriarchy.jpg'
import spoderman from '../img/spoderman.png'
import tootinpootin from '../img/tootinpootin.jpg'
import trump from '../img/trump.jpeg'
import hughmungus from '../img/Hugh_mungus.png'
import nolife from '../img/nolife.jpeg'
import ballas from '../img/ballas.jpeg'
import hogan from '../img/hogan.jpeg'
import cosby from '../img/cosby.jpeg'
import pakaluPapito from '../img/pakalu.jpg'
const sessionState = {
  avatarsURL:[hoigh,adolf,alex,doggo,patriarchy,pakaluPapito,ballas,spoderman,hogan,tootinpootin,trump,hughmungus,nolife,cosby],
  name:'',
  selectedAvatar: hoigh,
  high: 'Yes',
  enter: false
}

const categories = (state={},action) => {

  switch(action.type){
    case CAT_INIT_STATE:

    return action.payload.categories.reduce((acc,val)=>{
      acc.byId[val.name] = val
      acc.allCategories = [...acc.allCategories,val.name]
      return acc
    }
    ,{byId:{},allCategories:[]})

    default:
  return state
}
}

const session = (state=sessionState,action) =>{
  switch(action.type){
    case SESSION_INIT:
    return {
      ...state,
      name: action.payload.name,
      selectedAvatar: action.payload.selectedAvatar,
      enter: true
    }
    default:
    return state
  }

}

const posts = (state={},action) => {
  switch(action.type){
    case POSTS_INIT_STATE:
    return action.payload.posts.reduce((acc,val)=>{
      acc.byId[val.id] = val
      acc.allPosts = [...acc.allPosts,val.id]
      return acc
    },{byId:{},allPosts:[]})
    default:
    return state
  }
}

const comments = (state={},action) => {
  return state
}
export default combineReducers({
  categories,
  posts,
  comments,
  session,
});
