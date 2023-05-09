import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import { createStore,applyMiddleware,compose } from 'redux'
import { store } from './app/store';
import { fetchAllQuestions } from './features/questionSlice';
import { getAllusers } from './features/authSlice';

// const store = createStore(Reducers , compose(applyMiddleware(thunk)))

store.dispatch(fetchAllQuestions())
store.dispatch(getAllusers())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
