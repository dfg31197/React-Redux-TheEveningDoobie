import {INIT_STATE} from '../actions'
import { combineReducers } from 'redux'
import {CAT_INIT_STATE,POSTS_INIT_STATE,SESSION_INIT,DELETE_POST,LOG_OUT,ADD_POST,EDIT_POST,HANDLE_VOTE,COMMENTS_INIT,HANDLE_VOTE_COMMENT,ADD_COMMENT,UPDATE_COMMENT,DELETE_COMMENT} from '../actions'
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
import grade from '../img/grade.png'
import hogan from '../img/hogan.jpeg'
import cosby from '../img/cosby.jpeg'
import sadchan from '../img/sadchan.jpg'
import pakaluPapito from '../img/pakalu.jpg'
import beardwarrior from '../img/beardwarrior.jpeg'
import litjesus from '../img/litjesus.jpg'
import varg from '../img/varg.jpg'
import whenuwalkin from '../img/whenuwalkin.jpg'
const ALL_IMAGES = [hoigh,adolf,alex,doggo,patriarchy,spoderman,tootinpootin,trump,hughmungus,nolife,ballas,cosby,pakaluPapito,hogan,grade,sadchan,beardwarrior,litjesus,varg,whenuwalkin]
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
  selectedAvatar: 'IMG_0',
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

    case LOG_OUT:
    return sessionState

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

    case ADD_POST:
    return {
      ...state,
      byId:{
        ...state.byId,
        [action.payload.id]:{
          ...action.payload
        }
      },
      allPosts:[action.payload.id,...state.allPosts]
    }

    case ADD_COMMENT:
      return {
        ...state,
        byId:{
          ...state.byId,
          [action.parentId]: {
            ...state.byId[action.parentId],
            commentCount: state.byId[action.parentId].commentCount + 1
          }
        }
      }


    case DELETE_COMMENT:
    return {
      ...state,
      byId:{
        ...state.byId,
        [action.payload.parentId]:{
          ...state.byId[action.payload.parentId],
          commentCount: state.byId[action.payload.parentId].commentCount -1
        }
      }
    }


    case DELETE_POST:
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

    case HANDLE_VOTE:
    return {
      ...state,
      byId:{
        ...state.byId,
        [action.payload.id]:{
          ...state.byId[action.payload.id],
          voteScore: state.byId[action.payload.id].voteScore + action.payload.number
        }
      }
    }

    case EDIT_POST:
    return {
      ...state,
      byId:{
        ...state.byId,
        [action.payload.id]:{
          ...state.byId[action.payload.id],
          ...action.payload
        }
      }
    }

    default:
    return state
  }
}

const comments = (state={},action) => {
  switch(action.type){
    case COMMENTS_INIT:
    return action.payload.data.reduce((acc,val)=>{
        acc.byId[val.id] = val
        acc.allComments = [val.id,...acc.allComments]
        return acc
      },{byId:{},allComments:[]})

    case HANDLE_VOTE_COMMENT:
    return{
      ...state,
      byId:{
        ...state.byId,
        [action.payload.id]:{
          ...state.byId[action.payload.id],
          voteScore: state.byId[action.payload.id].voteScore + action.payload.number
        }
      }
    }


    case ADD_COMMENT:
    return{
      ...state,
      byId:{
        ...state.byId,
        [action.payload.id]:{
          ...action.payload,
          parentId: action.parentId,
          voteScore: 1,
          deleted: false,
          parentDeleted: false
        }
      },
      allComments: [action.payload.id,...state.allComments]
    }

    case UPDATE_COMMENT:
    return {
      ...state,
      byId:{
        ...state.byId,
        [action.payload.id]:{
          ...state.byId[action.payload.id],
          author: action.payload.author,
          timestamp: action.payload.timestamp,
          body: action.payload.body
        }
      }
    }

    case DELETE_COMMENT:
    return {
      ...state,
      byId:{
        ...state.byId,
        [action.payload.id]:{
          ...state.byId[action.payload.id],
          deleted: true
        }
      }
    }


    default:
    return state
  }
}
export default combineReducers({
  categories,
  posts,
  comments,
  session,
  images,
});
