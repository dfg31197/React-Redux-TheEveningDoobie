const CAT_INIT_STATE = 'CAT_INIT_STATE'
const POSTS_INIT_STATE = 'POSTS_INIT_STATE'
const SESSION_INIT = 'SESSION_INIT'
export {CAT_INIT_STATE,POSTS_INIT_STATE,SESSION_INIT,categoryInitState,sessionInit,postInitState}
const categoryInitState = ({categories}) => {
return {
  type: CAT_INIT_STATE,
  payload:{
    categories
  }
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
  console.log(posts)
  return {
  type: POSTS_INIT_STATE,
  payload:{
    posts
  }
}
}