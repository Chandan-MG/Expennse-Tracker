import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
// import '../node_modules/react-bootstrap/dist/react-bootstrap';
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './Components/Context-folder/Auth-Context';
import { ExpenseContextProvider } from './Components/Context-folder/Expense-Context';
import {Provider} from 'react-redux';
import store from './Store/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
