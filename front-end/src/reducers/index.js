import {INIT_STATE} from '../actions'
import { combineReducers } from 'redux'
import {CAT_INIT_STATE,POSTS_INIT_STATE,SESSION_INIT,DELETE_POST} from '../actions'
import hoigh from '../img/hoigh.jpg'
import adolf from '../img/adolf.jpg'
import alex from '../img/alex.jpeg'
import doggo from '../img/doggo.jpg'
import patriarchy from '../img/patriarchy.jpg'
import spoderman from '../img/spoderman.jpg'
import tootinpootin from '../img/tootinpootin.jpg'
import trump from '../img/trump.jpeg'
import hughmungus from '../img/Hugh_mungus.png'
import nolife from '../img/nolife.jpeg'
import ballas from '../img/ballas.jpeg'
import hogan from '../img/hogan.jpeg'
import cosby from '../img/cosby.jpeg'
import pakaluPapito from '../img/pakalu.jpg'
const ALL_IMAGES = [hoigh,adolf,alex,doggo,patriarchy,spoderman,tootinpootin,trump,hughmungus,nolife,ballas,cosby,pakaluPapito,hogan]
const imageState = {
  importantImagery: ALL_IMAGES.reduce((acc,img,index)=>{
  const id = `IMG_${index}`
      acc.byId[id]= {
        id,
        imageURL: img
      }

      acc.allImages = [...acc.allImages,id]
      return acc

  },{byId:{},allImages:[]})
}

const images = (state=imageState,action)=>{
  return state
}
const sessionState = {
  avatarsURL:'',
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

    case DELETE_POST:
    console.log(state)
    return {
      ...state,
      byId:{
        ...state.byId,
        [action.id]:{
          ...state.byId[action.id],
          deleted: true
        }
      }
    }
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
  images,
});
