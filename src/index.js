import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useWallet, UseWalletProvider } from 'use-wallet';
import { Provider } from 'react-redux';
import { store } from './libs/store';
import './css/normalize.css';
import './css/slick.css';
import './css/styles.css';
import './css/styles.css.map';
import './css/styles.less';
import { FiberPinRounded } from '@material-ui/icons';

// import './js/script';
// import './js/anime.min';
// import './js/jquery-3.3.0.min';
// import './js/script';
// import './js/slick.min';

ReactDOM.render(
  <Provider store={store}>
    <UseWalletProvider>
      <App />
    </UseWalletProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
