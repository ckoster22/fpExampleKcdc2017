import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import store from './app.store.reducer';
import {searchReposByUser} from './userEntry/Actions';

const render = () => ReactDOM.render(
  <App appstate={store.getState()} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

render();
store.subscribe(render);

searchReposByUser('ckoster22');