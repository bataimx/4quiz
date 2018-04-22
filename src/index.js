import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'
import Game from './components/Game';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
