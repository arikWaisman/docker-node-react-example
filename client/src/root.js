import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app.js';

import * as actions from './actions';

store.dispatch(actions.loadTokenOnAppInit());

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
