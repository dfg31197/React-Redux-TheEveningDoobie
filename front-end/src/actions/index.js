const CAT_INIT_STATE = 'CAT_INIT_STATE'
const POSTS_INIT_STATE = 'POSTS_INIT_STATE'
const SESSION_INIT = 'SESSION_INIT'
const DELETE_POST= 'DELETE_POST';
const LOG_OUT = 'LOG_OUT'
const ADD_POST = 'ADD_POST'
const EDIT_POST = 'EDIT_POST'
const HANDLE_VOTE = 'HANDLE_VOTE'
export {CAT_INIT_STATE,POSTS_INIT_STATE,SESSION_INIT,DELETE_POST,ADD_POST,LOG_OUT,EDIT_POST,HANDLE_VOTE,categoryInitState,sessionInit,postInitState,deletePost,sessionLogOut,addPost,editPost,handleVote}
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

const handleVote = ({id,number}) =>{
  return{
    type:HANDLE_VOTE,
    payload:{
      id,
      number
    }
  }
}

const editPost = (data)=>{
  console.log(data)
  return{
    type: EDIT_POST,
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
