import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {BrowserRouter,Route} from 'react-router-dom'
import rootReducer from './reducers/';
import {createStore} from 'redux'
import PostDetails from './components/PostDetails'
const store = createStore(rootReducer)
ReactDOM.render(<Provider store={store}><BrowserRouter>
  <div>
  <Route exact path="/" component={App} />
  <Route exact path="/posts/:id" component={PostDetails} />
  </div>
  </BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
