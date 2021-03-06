const CAT_INIT_STATE = 'CAT_INIT_STATE'
const POSTS_INIT_STATE = 'POSTS_INIT_STATE'
const SESSION_INIT = 'SESSION_INIT'
const COMMENTS_INIT = 'COMMENTS_INIT'
const DELETE_POST= 'DELETE_POST';
const LOG_OUT = 'LOG_OUT'
const ADD_POST = 'ADD_POST'
const EDIT_POST = 'EDIT_POST'
const HANDLE_VOTE = 'HANDLE_VOTE'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const HANDLE_VOTE_COMMENT = 'HANDLE_VOTE_COMMENT'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
export {CAT_INIT_STATE,POSTS_INIT_STATE,SESSION_INIT,DELETE_POST,ADD_POST,LOG_OUT,EDIT_POST,HANDLE_VOTE,COMMENTS_INIT,HANDLE_VOTE_COMMENT,ADD_COMMENT,UPDATE_COMMENT,DELETE_COMMENT,categoryInitState,sessionInit,postInitState,deletePost,sessionLogOut,addPost,editPost,handleVote,commentsInitState,handleVoteComments,addComment,actionUpdateComment,actionDeleteComment}
const categoryInitState = ({categories}) => {
return {
  type: CAT_INIT_STATE,
  payload:{
    categories
  }
}
}

const actionUpdateComment = (payload) =>{
  return {
    type: UPDATE_COMMENT,
    payload
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

const actionDeleteComment = (payload) =>{
  return {
    type:DELETE_COMMENT,
    payload
  }
}

const commentsInitState = (id,data) => ({
  type: COMMENTS_INIT,
  payload:{
    id,
    data
  }
})

const addComment = ({parentId,data}) =>({
  type: ADD_COMMENT,
  parentId,
  payload:{
    ...data
  }
})

const handleVoteComments = ({id,number}) =>{
return {
  type: HANDLE_VOTE_COMMENT,
  payload:{
    id,
    number
  }
}
}

const editPost = (data)=>{
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
