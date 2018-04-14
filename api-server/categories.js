const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  categories: [
      {
        name: 'Politics',
        path: 'politics',
        imgsrc: 'http://thefederalist.com/wp-content/uploads/2016/02/trumpie-998x657.jpg'
      },
      {
        name: 'Video Games',
        path: 'video-games',
        imgsrc: 'https://i.ytimg.com/vi/Zy6laZtRkcM/maxresdefault.jpg'
      },
      {
        name: 'Controversy',
        path: 'controversy',
        imgsrc: 'https://vignette.wikia.nocookie.net/r2da/images/c/ce/IM_TRIGGERED.jpg/revision/latest/scale-to-width-down/640?cb=20170131161337'
      },
      {
        name: 'Religion',
        path: 'religion',
        imgsrc: 'https://ichef.bbci.co.uk/news/624/cpsprodpb/13B8/production/_84584050_3494754156_9273aff2f3_b.jpg'
      },

      {
        name: 'Share your story',
        path: 'shared-stories',
        imgsrc: 'https://d3534p9h9e6ys6.cloudfront.net/cheers-beer-yoga.jpg'
      },

      {
        name: 'All',
        path: 'all',
        imgsrc: 'https://i.imgur.com/oRd0Onn.jpg'
      }
  ]
}

function getData (token) {
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

module.exports = {
  getAll
}
