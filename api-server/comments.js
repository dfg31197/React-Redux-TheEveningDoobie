const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  "1ifon1coelkdwsabf19jfio1e": {
    id: '1ifon1coelkdwsabf19jfio1e',
    parentId: "6abcni6ok3ym7mf1p33lnez",
    timestamp: 1468166872634,
    body: 'REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
    author: 'manhater2240',
    avatarID: 'IMG_4',
    voteScore: -14562,
    deleted: false,
    parentDeleted: false
  },
  "13ihfoienxpw1inoefo": {
    id: '13ihfoienxpw1inoefo',
    parentId: "6chingchongni6ok3ymchingnez",
    timestamp: 1469479767190,
    body: 'holy sht that me',
    author: '420whatyesmokin',
    avatarID: 'IMG_0',
    voteScore: 419,
    deleted: false,
    parentDeleted: false
  },
  "eoqube1eoqube1foqbnwicbq": {
    id: 'eoqube1eoqube1foqbnwicbq',
    parentId: "8xracistf0y6ziyjabvozdd253nd",
    timestamp: 1469449767190,
    body: 'PATRIARCHY!',
    author: 'transgenderbipolarsundriedpotato',
    avatarID: 'IMG_4',
    voteScore: -31894,
    deleted: false,
    parentDeleted: false
  },
  "RANDIAPNVEQOBONCAPSINQEQPIFEN": {
    id: 'RANDIAPNVEQOBONCAPSINQEQPIFEN',
    parentId: "8xracistf0y6ziyjabvozdd253nd",
    timestamp: 1469479167190,
    body: 'how dare you fucrnowe[ojgpviing pienfiefn pewgip nweog wrogi wroig wrio gpwiefqoas jfipean fpaon ipeag pofj npaeif mohterhfacn  faidos ndamd nfc utn af fukn caipsfn io patirachy i fasf nigr faion faisfno 70 cents  efas ina dollar',
    author: 'soyboy2004',
    avatarID: 'IMG_4',
    voteScore: -31894,
    deleted: false,
    parentDeleted: false
  },
  "OHYEDOGGOFUAKSANPQINOVE": {
    id: 'OHYEDOGGOFUAKSANPQINOVE',
    parentId: "8xf0y6ziyjabvozdd253nxxxd",
    timestamp: 1269479767190,
    body: '.',
    author: 'doggo',
    avatarID: 'IMG_3',
    voteScore: 8942781347,
    deleted: false,
    parentDeleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      avatarID: comment.avatarID,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      posts.incrementCommentCounter(token, comments[id].parentId, -1)
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
