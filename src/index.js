import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import App from './Components/App/App';

import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);

registerServiceWorker();