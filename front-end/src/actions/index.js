const CAT_INIT_STATE = 'CAT_INIT_STATE'
const POSTS_INIT_STATE = 'POSTS_INIT_STATE'
const SESSION_INIT = 'SESSION_INIT'
const DELETE_POST= 'DELETE_POST';
export {CAT_INIT_STATE,POSTS_INIT_STATE,SESSION_INIT,DELETE_POST,categoryInitState,sessionInit,postInitState,deletePost}
const categoryInitState = ({categories}) => {
return {
  type: CAT_INIT_STATE,
  payload:{
    categories
  }
}
}

const deletePost = ({id}) =>{
  return {
    type: DELETE_POST,
    id
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
