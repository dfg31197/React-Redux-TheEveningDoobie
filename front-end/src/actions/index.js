const CAT_INIT_STATE = 'CAT_INIT_STATE'
const POSTS_INIT_STATE = 'POSTS_INIT_STATE'
const SESSION_INIT = 'SESSION_INIT'
const DELETE_POST= 'DELETE_POST';
const LOG_OUT = 'LOG_OUT'
const ADD_POST = 'ADD_POST'
export {CAT_INIT_STATE,POSTS_INIT_STATE,SESSION_INIT,DELETE_POST,ADD_POST,LOG_OUT,categoryInitState,sessionInit,postInitState,deletePost,sessionLogOut,addPost}
const categoryInitState = ({categories}) => {
return {
  type: CAT_INIT_STATE,
  payload:{
    categories
  }
}
}

const addPost = (data) =>{
  return{
  type: ADD_POST,
  payload:{
    ...data
  }
}
}

const deletePost = ({id}) =>{
  return {
    type: DELETE_POST,
    id
  }
}

const sessionLogOut = () =>{
  return {
    type: LOG_OUT
  }
}

const sessionInit = ({name,selectedAvatar}) =>{
return {
  type : SESSION_INIT,
  payload:{
    name,
    selectedAvatar,
  }
}
}

const postInitState = ({posts}) => {
  return {
  type: POSTS_INIT_STATE,
  payload:{
    posts
  }
}
}
