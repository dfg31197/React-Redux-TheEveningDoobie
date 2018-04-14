import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {BrowserRouter,Route} from 'react-router-dom'
import rootReducer from './reducers/';
import {createStore} from 'redux'
import Loader from './components/Loader.js'
import PostDetails from './components/PostDetails'
import CreatePost from './components/CreatePost'
const store = createStore(rootReducer)
ReactDOM.render(<Provider store={store}><BrowserRouter>
  <div>
    <Route exact path="/" component={App} />
    <Route exact path="/posts/:id" component={PostDetails} />
    <Route exact path="/create-post" component = {CreatePost} />
    <Route exact path="/post/:id/edit" component={CreatePost} />
    <Route path="/" component={Loader} />
  </div>
  </BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
